import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
    const userInfo= await getUserInfo();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-2xl">
        <DashboardNavbarContent userInfo={userInfo} />
    </header>
  );
};

export default DashboardNavbar;