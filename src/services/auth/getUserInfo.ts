"use server";

import { IUser } from "@/types";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { getCookie } from "./tokenHandler";
import envConfig from "@/lib/env.config";

export const getUserInfo = async (): Promise<IUser | null> => {
  try {
    const accessToken = await getCookie();

    if (!accessToken) return null;

    const verifiedToken = jwt.verify(accessToken, envConfig.access_token_secret as Secret);
    if(!verifiedToken) return null;

    if(typeof verifiedToken === "string") return null;

    const userInfo: IUser = {
      email: verifiedToken.email,
      role: verifiedToken.role,
      name: ""
    };

    return userInfo;

  } catch (error) {}
};
