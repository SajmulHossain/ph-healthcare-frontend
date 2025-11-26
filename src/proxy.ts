import { NextResponse, NextRequest } from "next/server";

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
}

const doctorProtectedRoutes : RouteConfig = {
    exact:[],
    patterns: [/^\/doctor/]
}

const patientProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/],
};

const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/]
}

export function proxy(request: NextRequest) {
  //   return NextResponse.redirect(new URL('/', request.url))
  console.log("pathname", request.url);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
