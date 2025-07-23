import { Response } from "express";

export const setCookie = async (
  res: Response,
  cookieName: string,
  token: string
) => {
  return res.cookie(cookieName, token, {
    httpOnly: true,
    secure: false,
    sameSite:"lax"
  });
};
