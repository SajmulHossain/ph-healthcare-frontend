"use client";
import { logout } from "@/services/auth/logout";
import { Button } from "../ui/button";

const LogoutButton = () => {
    const handleLogout = async() => {
        await logout();
    }
  return (
    <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;