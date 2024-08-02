import { promises as fsPromises } from "fs";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

export const readImageFromFile = async (imagePath: string): Promise<string> => {
  try {
    // read the image
    const imageData = await fsPromises.readFile(imagePath);
    // convert the file to base64 encoded
    const base64Image = imageData.toString("base64");

    return base64Image;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while reading image"
    );
  }
};
