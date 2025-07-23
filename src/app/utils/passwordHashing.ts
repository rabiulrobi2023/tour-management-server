import bcrypt from "bcrypt";
import { envVariable } from "../config/envConfig";

export const passwordHashing = async (password: string) => {
  const hashPass = await bcrypt.hash(password, Number(envVariable.SALT)) as string;
  return hashPass;
};
