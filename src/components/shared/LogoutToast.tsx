"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LogoutToast = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        if(searchParams.get("loggedOut") === "true") {
            toast.success("Logged out successfully!");
        }
    }, [searchParams])

  return (
    <div>
      <h1>This is LogoutToast component</h1>
    </div>
  );
};

export default LogoutToast;