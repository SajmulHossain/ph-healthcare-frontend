import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { IUser } from "@/types";
import { getDefaultDashboardRoutes } from "@/lib/auth-utils";
import { NavSection } from "@/types/dashboard.interface";

const DashboardSidebar = async () => {
        const userInfo = await getUserInfo() as IUser;
        const navItems: NavSection[] = [];
  return (
    <aside className="hidden md:flex h-full w-64 flex-col border-r bg-card">
      <DashboardSidebarContent userInfo={userInfo} navItems={navItems} dashboardHome={getDefaultDashboardRoutes(userInfo?.role)} />
    </aside>
  );
};

export default DashboardSidebar;