/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import jwt, { Secret } from "jsonwebtoken";
import envConfig from "@/lib/env.config";
import {
  getDefaultDashboardRoutes,
  isValidRedirectPath,
} from "@/lib/auth-utils";

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
    const redirectTo = formData.get("redirect") || null;

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

    const cookieHeaders = res.headers.getSetCookie();

    if (cookieHeaders && cookieHeaders.length) {
      cookieHeaders.map((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie.accessToken) {
          accessTokenObject = parsedCookie as Record<string, string>;
        }

        if (parsedCookie.refreshToken) {
          refreshTokenObject = parsedCookie as Record<string, string>;
        }
      });
    } else {
      throw new Error("No set cookie header found!");
    }

    if (!accessTokenObject || !refreshTokenObject) {
      throw new Error("No tokens found");
    }

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessTokenObject.accessToken, {
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]),
      expires: accessTokenObject.Expires,
      secure: true,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject.SameSite || "none",
    });
    cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject["Max-Age"]),
      expires: refreshTokenObject.Expires,
      sameSite: refreshTokenObject.SameSite || "none",
      secure: true,
      path: refreshTokenObject.Path || "/",
    });

    const verifiedToken = jwt.verify(
      accessTokenObject.accessToken,
      envConfig.access_token_secret as Secret
    );

    if (typeof verifiedToken === "string") {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      throw new Error("Invalid token");
    }

    if (redirectTo) {
      const requestPath = redirectTo.toString();
      if (isValidRedirectPath(requestPath, verifiedToken.role)) {
        redirect(requestPath);
      } else {
        redirect(getDefaultDashboardRoutes(verifiedToken.role));
      }
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return { error, message: "Login failed" };
  }
};
