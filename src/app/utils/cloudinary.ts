import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_cloud_api_key,
  api_secret: config.cloudinary_cloud_api_secret,
});

const uploadOnCloudinary = async (
  localFilePath: string,
  folderName: string
) => {
  console.log({ localFilePath });

  try {
    if (!localFilePath) {
      throw new AppError(StatusCodes.NOT_FOUND, "File not found");
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
    });

    console.log({ response });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error);

    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (
  public_id: string,
  resource_type: string
) => {
  if (!public_id) {
    return null;
  }
  try {
    const response = await await cloudinary.uploader.destroy(public_id, {
      resource_type: resource_type,
    });
    return response;
  } catch (error) {
    throw new AppError(500, "Something went wrong while deleting photo");
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
