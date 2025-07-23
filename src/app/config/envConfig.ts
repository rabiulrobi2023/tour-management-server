import dotenv from "dotenv";

dotenv.config();

interface IEnvVars {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  SALT: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRE: string;
  JWT_EXPIRE: string;
  SUPER_ADMIN_EAMIL: string;
  SUPER_ADMIN_PASS: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  EXPRESS_SESSION_SECRET: string;
  FORNTEND_URL: string;
}

const requiredVariables = [
  "PORT",
  "DB_URL",
  "NODE_ENV",
  "SALT",
  "JWT_SECRET",
  "JWT_EXPIRE",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRE",
  "SUPER_ADMIN_EAMIL",
  "SUPER_ADMIN_PASS",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
  "EXPRESS_SESSION_SECRET",
  "FORNTEND_URL",
];

const envVars = (): IEnvVars => {
  requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Missing required environment variable ${variable}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    SALT: process.env.SALT as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRE: process.env.JWT_EXPIRE as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE as string,
    SUPER_ADMIN_EAMIL: process.env.SUPER_ADMIN_EAMIL as string,
    SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    FORNTEND_URL: process.env.FORNTEND_URL as string,
  };
};
export const envVariable = envVars();
