import { RouteConfig, UserRole } from "@/types";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
};

export const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/doctor/],
};

export const patientProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/],
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/],
};

export const isAuthRoutes = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

export const isMatchedRoutes = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }

  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (
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

export const getDefaultDashboardRoutes = (role: UserRole): string => {
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
