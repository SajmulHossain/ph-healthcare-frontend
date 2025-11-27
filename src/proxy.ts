import jwt, { Secret } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import envConfig from "./lib/env.config";
import { cookies } from "next/headers";
import { getDefaultDashboardRoutes, getRouteOwner, isAuthRoutes } from "./lib/auth-utils";
import { UserRole } from "./types";

export async function proxy(request: NextRequest) {
  let userRole: UserRole | null = null;
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = request.cookies.get("accessToken")?.value || null;

  if (accessToken) {
    const verifiedToken = jwt.verify(
      accessToken,
      envConfig.access_token_secret as Secret
    );

    if (typeof verifiedToken === "string") {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = verifiedToken.role;
  }

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoutes(pathname);

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoutes(userRole as UserRole), request.url)
    );
  }

  if (!routeOwner) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  if (
    routeOwner === "ADMIN" ||
    routeOwner === "DOCTOR" ||
    routeOwner === "PATIENT"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoutes(userRole as UserRole), request.url)
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
