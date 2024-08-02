import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { TBasicProfileAttributes } from "./basicProfile.interface";
import BasicProfile from "./basicProfile.model";
import Address from "../../address/address.model";
import User from "../../user/user.model";
import File from "../../file/file.model";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../../utils/cloudinary";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import Candidate from "../candidate/candidate.model";
import Interviewer from "../interviewer/interviewer.model";
import { Role, TRoleType } from "../../user/user.constant";
import { IncludeOptions } from "sequelize";
import Skill from "../../skill/skill.model";
import Experience from "../../experience/experience.model";

// create basic profile
const createBasicProfile = async (
  payload: TBasicProfileAttributes,
  userId: string
) => {
  const { current_address, permanent_address, ...restBasicInfo } = payload;
  // check profile already exists
  const isProfileExist = await BasicProfile.findOne({
    where: { userId },
  });
  if (isProfileExist) {
    throw new AppError(StatusCodes.CONFLICT, "Already uploaded profile info.");
  }

  //  user info to update
  const userInfoToUpdate = {
    ...restBasicInfo,
    userId,
  };

  // check need to add current address
  let newCurrentAddress;
  if (current_address) {
    newCurrentAddress = await Address.create(current_address);
  }

  // check need to add permanent address
  let newPermanentAddress;
  if (permanent_address) {
    newPermanentAddress = await Address.create(permanent_address);
  }

  // if addresses has been created add to user info
  if (newCurrentAddress?.id) {
    userInfoToUpdate.current_address_id = newCurrentAddress!.id;
  }
  if (newPermanentAddress?.id) {
    userInfoToUpdate.permanent_address_id = newPermanentAddress!.id;
  }

  const newUserProfile = await BasicProfile.create(userInfoToUpdate);

  if (!newUserProfile.id) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "There is a problem creating new user profile"
    );
  }

  return newUserProfile;
};

// update basic profile
const updateBasicProfile = async (
  payload: TBasicProfileAttributes,
  userId: string
) => {
  //  check if basic profile exists
  const isBasicProfileExists = await BasicProfile.findOne({
    where: { userId },
  });
  if (!isBasicProfileExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Basic profile of the user does not exist."
    );
  }

  const { current_address, permanent_address, ...resBasicInfo } = payload;

  // data to update
  const dataToUpdate = {
    ...resBasicInfo,
  };

  //  if payload contains current address
  if (current_address) {
    // if already added current address then update that
    if (isBasicProfileExists.current_address_id) {
      await Address.update(current_address, {
        where: { id: isBasicProfileExists.current_address_id },
      });
    }
    // if   current address not added than add current address
    else {
      const newCurrentAddress = await Address.create(current_address);
      dataToUpdate.current_address_id = newCurrentAddress.id;
    }
  }

  //  if payload contains permanent address
  if (permanent_address) {
    // if already added permanent address then update that
    if (isBasicProfileExists.permanent_address_id) {
      await Address.update(permanent_address, {
        where: { id: isBasicProfileExists.permanent_address_id },
      });
    }
    // if   permanent address not added than add permanent address
    else {
      const newPermanentAddress = await Address.create(permanent_address);
      dataToUpdate.permanent_address_id = newPermanentAddress.id;
    }
  }

  // update basic profile data
  const updatedBasicProfile = await BasicProfile.update(dataToUpdate, {
    where: { userId },
  });

  return updatedBasicProfile;
};

// get my data
const getMe = async (userId: string, current_role: TRoleType) => {
  const includeArray: IncludeOptions[] = [
    {
      model: BasicProfile,
      as: "basicProfile",
      include: [
        {
          model: Address,
          as: "current_address",
        },
        {
          model: Address,
          as: "permanent_address",
        },
        {
          model: File,
          as: "profile_image",
        },
      ],
    },
  ];
  if (current_role === Role.CANDIDATE) {
    includeArray.push({
      model: Candidate,
      as: "candidateProfile",
      include: [
        {
          model: Skill,
          as: "skills",
        },
        {
          model: Experience,
          as: "candidateExperiences",
          include: [
            {
              model: Skill,
              as: "skills",
            },
          ],
        },
      ],
    });
  }

  if (current_role === Role.INTERVIEWER) {
    includeArray.push({
      model: Interviewer,
      as: "interviewerProfile",
      include: ["skills"],
    });
  }

  const myProfile = await User.findOne({
    where: { id: userId },
    include: includeArray,
    attributes: {
      exclude: ["password"],
    },
  });

  if (!myProfile!.id) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "There is a problem to retrieved data."
    );
  }

  return myProfile;
};

// switch my role
const switchMyRole = async (userId: string, roleToSwitch: string) => {
  const user = await User.findOne({ where: { id: userId } });

  if (roleToSwitch === user?.current_role) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "You are already in this role."
    );
  }

  if (!user?.roles.includes(roleToSwitch)) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "You are not allowed to switch role, please create the role."
    );
  }

  const updatedUser = await User.update(
    { current_role: roleToSwitch },
    { where: { id: userId } }
  );

  return updatedUser;
};

// update profile image
const uploadProfileImage = async (payload: {
  userId: string;
  local_path: string;
}) => {
  const profile_image = await uploadOnCloudinary(
    payload.local_path,
    "Profile_Images"
  );
  if (!profile_image) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong uploading profile image"
    );
  }

  const tx = await sequelizeConnection.transaction();

  try {
    const result = await File.create({
      public_id: profile_image.public_id,
      secure_url: profile_image.secure_url,
      url: profile_image.url,
    });

    if (result) {
      await BasicProfile.update(
        { profile_image_id: result.id },
        { where: { userId: payload.userId } }
      );
    }
    await tx.commit();
    return result;
  } catch (error) {
    await tx.rollback();
    await deleteFromCloudinary(profile_image.public_id, "image");
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong uploading profile image"
    );
  }
};

const BasicProfileServices = {
  createBasicProfile,
  getMe,
  switchMyRole,
  uploadProfileImage,
  updateBasicProfile,
};

export default BasicProfileServices;
