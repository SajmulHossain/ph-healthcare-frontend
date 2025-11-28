import { getDefaultDashboardRoutes } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUser } from "@/types";
import { NavSection } from "@/types/dashboard.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getNavItemsByRole } from "@/lib/navItem.config";

const DashboardSidebar = async () => {
        const userInfo = await getUserInfo() as IUser;
        const navItems: NavSection[] = getNavItemsByRole(userInfo?.role);
  return (
    <aside className="hidden md:flex h-full w-64 flex-col border-r bg-card">
      <DashboardSidebarContent userInfo={userInfo} navItems={navItems} dashboardHome={getDefaultDashboardRoutes(userInfo?.role)} />
    </aside>
  );
};

export default DashboardSidebar;