"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LogoutToast = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if(searchParams.get("loggedOut") === "true") {
            toast.success("Logged out successfully!");
            const newURL = new URL(window.location.href)
            newURL.searchParams.delete("loggedOut");
            router.replace(newURL.toString());
        }
    }, [searchParams, router])

    return null;
};

export default LogoutToast;