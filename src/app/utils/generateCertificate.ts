/* eslint-disable no-undef */
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import config from "../config";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_cloud_api_key,
  api_secret: config.cloudinary_cloud_api_secret,
});

export type TGenerateCertificateProps = {
  name: string;
  mark: string;
};

const generateCertificate = async (payload: TGenerateCertificateProps) => {
  const certificatePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "certificate.png"
  );
  const outputPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "certificate",
    `${payload.name}-certificate.pdf`
  );

  console.log({ certificatePath, outputPath, payload });

  // Read the existing PDF certificate
  const existingPDF = fs.readFileSync(certificatePath);

  // Create a new PDF document based on the existing PDF
  const doc = new PDFDocument({ size: [2000, 1414] });
  doc.pipe(fs.createWriteStream(outputPath)); // Save the modified PDF temporarily

  // Pipe the existing PDF into the new PDF
  doc.image(existingPDF, 0, 0, { width: 2000, height: 1414 }); // Assuming the existing PDF is letter-sized (8.5 x 11 inches)

  // Add user-specific data to the modified PDF
  doc
    .fillColor("red") // Set the fill color to red
    .fontSize(20) // Set the font size
    .text(payload.name, 400, 600); // Specify the position

  // Style the second text differently
  doc
    .fillColor("blue") // Set the fill color to blue
    .font("Helvetica-Bold") // Set the font to bold Helvetica
    .fontSize(30) // Set the font size
    .text(payload.mark, 200, 600);
  // Finalize the modified PDF
  doc.end();

  // Upload the PDF to Cloudinary
  try {
    const cloudinaryResponse = await cloudinary.uploader.multi(
      outputPath,
      {
        format: "pdf",
        transformation: {
          width: 400,
          Height: 600,
          crop: "limit",
        },
      },
      function (error, result) {
        console.log(result, error);
      }
    );

    // Retrieve the public URL of the uploaded PDF from Cloudinary
    const certificateURL = cloudinaryResponse.secure_url;
    console.log({ cloudinaryResponse });

    // Delete the temporary PDF file
    // fs.unlinkSync(outputPath);

    return certificateURL;
  } catch (error) {
    console.error("Error uploading PDF to Cloudinary:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export default generateCertificate;
