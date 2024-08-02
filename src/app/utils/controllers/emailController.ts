// import expressAsyncHandler from "express-async-handler";
// import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_MAIL, // generated ethereal user
//     pass: process.env.SMTP_PASSWORD, // generated ethereal password
//   },
// });

// const sendEmail2 = expressAsyncHandler(async (req, res) => {
//   const { email, subject, message } = req.body;

//   const mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: email,
//     subject: subject,
//     text: message,
//     html: `<!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Email Template</title>
//           <style>
//               body {
//                   font-family: Arial, sans-serif;
//                   background-color: #f4f4f4;
//                   margin: 0;
//                   padding: 0;
//               }
//               .container {
//                   max-width: 600px;
//                   margin: 0 auto;
//                   padding: 20px;
//                   background-color: #ffffff;
//                   border-radius: 10px;
//                   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//               }
//               .header {
//                   text-align: center;
//                   margin-bottom: 20px;
//               }
//               .header img {
//                   width: 150px;
//               }
//               .content {
//                   text-align: center;
//                   padding: 20px;
//               }
//           </style>
//       </head>
//       <body>
//           <div class="container">
//               <div class="content">
//                   <b style="font-size:2rem">This email is powered by Empower .</b>
//                   <p><img src="https://picsum.photos/300/200" alt="Placeholder Image"></p>
//                   <h1>${subject}</h1>
//                   <p>${message}</p>
//               </div>
//           </div>
//       </body>
//       </html>,`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//     } else {
//       res.status(200).json({ message: "Email sent successfully" });
//     }
//   });
// });

// export default sendEmail2;
