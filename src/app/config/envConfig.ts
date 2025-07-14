import dotenv from "dotenv";

dotenv.config();

interface IEnvVariables {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  SALT: string;
}

const requiredVariables = ["PORT", "DB_URL", "NODE_ENV", "SALT"];

const envVariables = (): IEnvVariables => {
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
  };
};
export const envVariable = envVariables();
