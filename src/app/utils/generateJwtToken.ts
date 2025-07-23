import { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { IUser } from "../modules/user/user.ifterface";

export const generateJwtToken = (
  userData: Partial<IUser>,
  jwtSecret: string,
  jwtExpire: string
) => {
  const jwtPayload = {
    id: userData._id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
  };

  const token = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn: jwtExpire,
  } as SignOptions);
  return token;
};
