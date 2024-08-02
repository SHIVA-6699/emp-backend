/* eslint-disable no-undef */
import multer, { diskStorage, FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

// Define storage settings
const storage = diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    // Example: save images to public/images directory and videos to public/videos directory
    let destination = "public/images";
    if (file.mimetype.startsWith("video")) {
      destination = "public/videos";
    }
    cb(null, destination);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Example: prepend current timestamp to filename to make it unique
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

// Define file filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Example: accept only images with .jpg, .jpeg, or .png extensions and videos with specific MIME types
  const allowedImageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
  const allowedVideoMimeTypes = ["video/mp4", "video/mpeg", "video/quicktime"];

  // Define file size limits based on file type
  const imageSizeLimit = 50 * 1024 * 1024; // 50 MB
  const videoSizeLimit = 100 * 1024 * 1024; // 100 MB

  const fileSizeLimit = file.mimetype.startsWith("video")
    ? videoSizeLimit
    : imageSizeLimit;

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedImageExtensions.includes(fileExtension)) {
    cb(null, true);
  } else if (allowedVideoMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.size >= fileSizeLimit) {
    cb(
      new AppError(
        StatusCodes.NOT_ACCEPTABLE,
        `File size exceeds the limit of ${fileSizeLimit} bytes`
      )
    );
  } else {
    cb(
      new AppError(
        StatusCodes.NOT_ACCEPTABLE,
        "Only images (.jpg, .jpeg, .png) and videos are allowed"
      )
    );
  }
};

// Create Multer instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    files: 6, // Example: allow a maximum of 5 files per request
  },
});
