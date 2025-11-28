import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getNavItemsByRole } from "@/lib/navItem.config";
import { getDefaultDashboardRoutes } from "@/lib/auth-utils";
import { IUser } from "@/types";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as IUser;
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-2xl">
      <DashboardNavbarContent
        userInfo={userInfo}
        navItems={getNavItemsByRole(userInfo?.role)}
        dashboardHome={getDefaultDashboardRoutes(userInfo?.role)}
      />
    </header>
  );
};

export default DashboardNavbar;
