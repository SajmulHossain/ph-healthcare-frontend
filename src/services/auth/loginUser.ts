/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {parse} from 'cookie';
import { cookies } from 'next/headers';
import z from "zod";

const loginValidationZodSchema = z.object({
  email: z.email("Give a valid email!"),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters" }),
});

export const loginUser = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    const redirect = formData.get("redirect");
    console.log(redirect, "from server");
    
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const validatedData = loginValidationZodSchema.safeParse(loginData);

    if (!validatedData.success) {
      return {
        errors: validatedData.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

   const cookieHeaders = res.headers.getSetCookie();

   if(cookieHeaders && cookieHeaders.length) {
cookieHeaders.map((cookie: string) => {
  const parsedCookie = parse(cookie);

  if(parsedCookie.accessToken) {
    accessTokenObject = parsedCookie as Record<string, string>
  }
  

  if(parsedCookie.refreshToken) {
    refreshTokenObject = parsedCookie as Record<string, string>
  }
  
})
   } else {
    throw new Error("No set cookie header found!")
   }
   
   if(!accessTokenObject || !refreshTokenObject) {
    throw new Error("No tokens found");
   }

   
   
   const cookieStore = await cookies();
   cookieStore.set("accessToken", accessTokenObject.accessToken, {
    httpOnly: true,
    maxAge: parseInt(accessTokenObject["Max-Age"]),
    expires: accessTokenObject.Expires,
    secure: true,
    path: accessTokenObject.Path || "/",
    sameSite: accessTokenObject.SameSite || "none"
   });
   cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
     httpOnly: true,
     maxAge: parseInt(refreshTokenObject["Max-Age"]),
     expires: refreshTokenObject.Expires,
     sameSite: refreshTokenObject.SameSite || "none",
     secure: true,
     path: refreshTokenObject.Path || "/",
   });
   
    return result;
  } catch (error) {
    console.log(error);
    return { error, message: "Login failed" };
  }
};
