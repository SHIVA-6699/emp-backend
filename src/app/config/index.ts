import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export default {
  port: process.env.PORT,
  client_url: process.env.CLIENT_URL,
  
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_url: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUD_NAME,
  cloudinary_cloud_api_key: process.env.API_KEY,
  cloudinary_cloud_api_secret: process.env.API_SECRET,
  my_email_address: process.env.MY_EMAIL_ADDRESS,
  email_app_password: process.env.EMAIL_APP_PASSWORD,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_mail: process.env.SMTP_MAIL,
  smtp_password: process.env.SMTP_PASSWORD,
  
};
