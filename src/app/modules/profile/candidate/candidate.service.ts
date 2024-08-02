import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import Skill from "../../skill/skill.model";
import { Role } from "../../user/user.constant";
import User from "../../user/user.model";
import { TCandidateAttributes } from "./candidate.interface";
import Candidate, { CandidateSkill } from "./candidate.model";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import { TSkillAttributes } from "../../skill/skill.interface";
import { TExperienceAttributes } from "../../experience/experience.interface";
import Experience, { ExperienceSkill } from "../../experience/experience.model";
import { Op } from "sequelize";
import BasicProfile from "../basicProfile/basicProfile.model";
import JobInvitationToCandidate from "../../jobInvitationToCandidate/jobInvitationToCandidate.interfaces.model";

// create candidate profile
const createCandidateProfile = async (
  payload: TCandidateAttributes,
  userId: string
): Promise<TCandidateAttributes> => {
  const user = await User.findByPk(userId);
  // check if user already have candidate role
  if (user?.roles.includes(Role.CANDIDATE)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `This user has already have ${Role.CANDIDATE} role. Please switch the role.`
    );
  }

  const { skills, ...basicData } = payload;

  basicData.userId = userId;

  // transaction and role back
  let newCandidateProfile: Candidate;
  const tx = await sequelizeConnection.transaction();
  try {
    newCandidateProfile = await Candidate.create({ ...basicData });
    await User?.update(
      { roles: [...user!.roles, Role.CANDIDATE], current_role: Role.CANDIDATE },
      { where: { id: userId } }
    );
    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong. Please try again."
    );
  }

  if (skills && skills?.length > 0) {
    const skillInstances = await Skill.findAll({
      where: { id: skills as string[] },
    });
    // create association using candidate skills
    const associations = skillInstances.map(skill => ({
      candidateId: newCandidateProfile.id,
      skillId: skill.id,
    }));
    await CandidateSkill.bulkCreate(associations);
  }

  return newCandidateProfile;
};

// update candidate profile
const updateCandidateProfile = async (
  payload: TCandidateAttributes,
  userId: string
) => {
  const { skills, ...basicInfo } = payload;
  const user = await User.findByPk(userId);
  // if user role is candidate
  if (!(user?.current_role === Role.CANDIDATE)) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      `${user!.current_role} is not allowed to update ${Role.CANDIDATE}`
    );
  }

  // current candidate
  const candidate = (await Candidate.findOne({
    where: { userId },
    include: [
      {
        model: Skill,
        as: "skills",
      },
    ],
  })) as TCandidateAttributes;

  if (!candidate) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `No ${Role.CANDIDATE} profile found for this user.`
    );
  }

  // update basic info
  const updatedCandidateProfile = await Candidate.update(basicInfo, {
    where: { userId },
  });

  // filter skills that already exist on candidate profile
  let skillsToAdd: string[];
  if (candidate.skills && candidate!.skills?.length > 0) {
    const existingSkills = (candidate!.skills as TSkillAttributes[])?.map(
      (skill: TSkillAttributes) => skill.id
    );
    skillsToAdd = (skills as string[])?.filter(
      skill => !existingSkills.includes(skill)
    );
  } else {
    skillsToAdd = skills as string[];
  }

  //  skills need to add
  if (skillsToAdd && skillsToAdd.length > 0) {
    const skillInstances = await Skill.findAll({ where: { id: skillsToAdd } });
    // create association using candidate skills
    const associations = skillInstances.map(skill => ({
      candidateId: candidate!.id,
      skillId: skill.id,
    }));

    await CandidateSkill.bulkCreate(associations);
  }

  return updatedCandidateProfile;
};

// add new experience
const addCandidateNewExperience = async (
  payload: TExperienceAttributes,
  userId: string
): Promise<Experience> => {
  // check candidate profile exist
  const isCandidateProfileExist = await Candidate.findOne({
    where: { userId },
  });

  if (!isCandidateProfileExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `No ${Role.CANDIDATE} profile found for this user.`
    );
  }

  // destructure the payload
  const { skills, ...restData } = payload;
  const newCandidateExperience = await Experience.create({
    ...restData,
    candidateId: isCandidateProfileExist.id,
  });

  //  make associations between skills and experience
  if (skills && skills.length > 0) {
    const skillInstances = await Skill.findAll({
      where: { id: skills as string[] },
    });
    if (skillInstances.length < 1) {
      throw new AppError(StatusCodes.NOT_FOUND, `No skill found.`);
    }

    // create association using experience and  skills
    const associations = skillInstances.map(skill => ({
      experienceId: newCandidateExperience.id,
      skillId: skill.id,
    }));

    await ExperienceSkill.bulkCreate(associations);
  }
  return newCandidateExperience;
};

// update experience
const updateCandidateExperience = async (
  payload: TExperienceAttributes,
  userId: string,
  experienceId: string
) => {
  // check user has candidate profiles
  const isCandidateProfileExist = await Candidate.findOne({
    where: { userId },
  });

  if (!isCandidateProfileExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "User has not candidate profiles"
    );
  }

  // check is experience exists
  const isExperienceExist = (await Experience.findOne({
    where: {
      id: experienceId,
    },
    include: ["skills"],
  })) as TExperienceAttributes;

  if (!isExperienceExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Experience does not exist.");
  }
  // check the experience belongs to candidate
  if (isExperienceExist.candidateId !== isCandidateProfileExist.id) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "You are not allowed to update this experience."
    );
  }

  // destructure the payload
  const { skills, ...restData } = payload;

  const updatedCandidateExperience = await Experience.update(restData, {
    where: { id: experienceId },
  });

  // do update if skills need to update
  let skillsToAdd;
  if (skills && skills.length) {
    const existingSkills = (
      isExperienceExist!.skills as TSkillAttributes[]
    ).map(skill => skill.id);

    skillsToAdd = skills.filter(
      skill => !existingSkills.includes(skill as string)
    );
  } else {
    skillsToAdd = skills;
  }

  if (skillsToAdd && skillsToAdd.length) {
    const association = skillsToAdd.map(skill => ({
      skillId: skill,
      experienceId: experienceId,
    }));

    await ExperienceSkill.bulkCreate(association);
  }

  return updatedCandidateExperience;
};

// get all candidates
const getAllCandidatesForSrm = async (
  jobAssignmentId: string,
  userId: string
) => {
  const myCandidateProfile = await Candidate.findOne({ where: { userId } });
  const jobInvitations = await JobInvitationToCandidate.findAll({
    where: {
      jobAssignmentToSRMId: jobAssignmentId,
    },
  });

  let notIncludedCandidateIds: string[] = [];

  if (jobInvitations?.length) {
    notIncludedCandidateIds = jobInvitations?.map(
      invitation => invitation?.candidateId
    );
  }

  if (myCandidateProfile) {
    notIncludedCandidateIds.push(myCandidateProfile?.id);
  }

  const candidatesProfiles = await Candidate.findAll({
    where: {
      id: {
        [Op.notIn]: notIncludedCandidateIds,
      },
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "roles"],
        },
        include: [
          {
            model: BasicProfile,
            as: "basicProfile",
          },
        ],
      },
    ],
  });

  return candidatesProfiles;
};

const CandidateServices = {
  createCandidateProfile,
  updateCandidateProfile,
  addCandidateNewExperience,
  updateCandidateExperience,
  getAllCandidatesForSrm,
};

export default CandidateServices;
