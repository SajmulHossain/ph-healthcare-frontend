"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IUser } from "@/types";
import { Bell, Menu, Search } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import { NavSection } from "@/types/dashboard.interface";
interface DashboardSidebarContentProps {
  userInfo: IUser,
  navItems: NavSection[],
  dashboardHome: string
}

const DashboardNavbarContent = ({ userInfo, dashboardHome, navItems }: DashboardSidebarContentProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    }

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, []);
  return (
    <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
      <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        {/* Hide the overlay on medium and larger screens */}
        <SheetContent side="left" className="w-64 p-0">
          <DashboardMobileSidebar
            userInfo={userInfo}
            navItems={navItems || []}
            dashboardHome={dashboardHome || ""}
          />
        </SheetContent>
      </Sheet>

      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/12 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User Dropdown */}
        <UserDropdown userInfo={userInfo} />
      </div>
    </div>
  );
};

export default DashboardNavbarContent;
