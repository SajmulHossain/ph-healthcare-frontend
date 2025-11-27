import jwt, { Secret } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import envConfig from "./lib/env.config";
import { cookies } from "next/headers";

type UserRole = "DOCTOR" | "PATIENT" | "ADMIN";

interface RouteConfig {
  exact: string[];
  patterns: RegExp[];
}

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
};

const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/doctor/],
};

const patientProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/],
};

const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/],
};

const isAuthRoutes = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

const isMatchedRoutes = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }

  return routes.patterns.some((pattern) => pattern.test(pathname));
};

const getRouteOwner = (
  pathname: string
): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
  if (isMatchedRoutes(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isMatchedRoutes(pathname, doctorProtectedRoutes)) {
    return "DOCTOR";
  }
  if (isMatchedRoutes(pathname, patientProtectedRoutes)) {
    return "PATIENT";
  }
  if (isMatchedRoutes(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }

  return null;
};

const getDefaultDashboardRoutes = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }

  if (role === "DOCTOR") {
    return "/doctor/dashboard";
  }

  if (role === "PATIENT") {
    return "/dashboard";
  }

  return "/";
};

export async function proxy(request: NextRequest) {
  //   return NextResponse.redirect(new URL('/', request.url))
  let userRole: UserRole | null = null;
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = request.cookies.get("accessToken")?.value || null;

  if(accessToken) {
    const verifiedToken = jwt.verify(accessToken, envConfig.access_token_secret as Secret)

    if(typeof verifiedToken === "string") {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url))
    }

    userRole = verifiedToken.role; 
  }

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoutes(pathname);

  if(accessToken && isAuth) {
    return NextResponse.redirect(new URL(getDefaultDashboardRoutes(userRole as UserRole), request.url))
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
