import { Response } from "express";
export const userLogout = async (res: Response, tokenName: string) => {
  res.clearCookie(tokenName, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
};
