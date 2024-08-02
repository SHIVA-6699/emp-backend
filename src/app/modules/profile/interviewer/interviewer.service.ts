/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import Interviewer, { InterviewerSkill } from "./interviewer.model";
import Skill from "../../skill/skill.model";
import { TInterviewerAttributes } from "./interviewer.interface";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { Role } from "../../user/user.constant";

const createInterviewerProfile = async (
  payload: { skills: string[] },
  userId: string
): Promise<TInterviewerAttributes> => {
  // check if already interviewer profile exist
  const isInterviewerProfileExistByUserId = await Interviewer.findOne({
    where: { userId },
  });
  if (isInterviewerProfileExistByUserId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Interviewer role already exists of the user."
    );
  }

  const currentUser = await User.findOne({ where: { id: userId } });

  const tx = await sequelizeConnection.transaction();
  let newInterviewerProfile:any; 

  try {
    newInterviewerProfile = await Interviewer.create({ userId });

    await User.update(
      {
        current_role: Role.INTERVIEWER,
        roles: [...currentUser!.roles, Role.INTERVIEWER],
      },
      { where: { id: userId } }
    );

    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `There was a problem to create theInterviewer profile.`
    );
  }

  if (payload.skills && payload.skills.length) {
    const skillInstances = await Skill.findAll({
      where: {
        id: payload.skills,
      },
    });

    if (!skillInstances.length) {
      throw new AppError(StatusCodes.NOT_FOUND, "Skills are not founded.");
    }

    const associations = skillInstances.map(skill => ({
      skillId: skill.id,
      interviewerId: newInterviewerProfile.id,
    }));

    await InterviewerSkill.bulkCreate(associations);
  }

  return newInterviewerProfile;
};

const InterviewerServices = {
  createInterviewerProfile,
};

export default InterviewerServices;
