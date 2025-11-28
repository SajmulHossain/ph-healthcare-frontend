import LogoutButton from "@/components/shared/Logout";
import { getCookie } from "@/services/auth/tokenHandler";
import { ReactNode } from "react";

const CommonDashboardLayout = async ({children}: {children: ReactNode}) => {
    const accessToken =await getCookie()
  return (
    <div>
      {accessToken && <LogoutButton />}
      {children}
    </div>
  );
};

export default CommonDashboardLayout;