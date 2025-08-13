import bcrypt from "bcrypt";

export const checkPassword = (givenPass: string, savedPass: string) => {
  return bcrypt.compare(givenPass, savedPass);

};
