import dotenv from "dotenv";

dotenv.config();

interface IEnvVariables {
  PORT: string;
  DB_URL: string;
}

const requiredVariables = ["PORT", "DB_URL"];

const loadEnvVariables = (): IEnvVariables => {
  requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Missing required environment variable ${variable}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
  };
};
export const enfVariable = loadEnvVariables();
