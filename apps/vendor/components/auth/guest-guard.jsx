"use client"
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { paths } from "ui/paths";

// GuestGuard component is used to protect routes that require the user to be a guest, e.g. login and register pages
export function GuestGuard({ children }) {
    const router = useRouter(); // Move the useRouter hook inside the GuestGuard component
    const { isAuthenticated, isInitialized } = useAuth();

    // Check if the user is authenticated
    useEffect(() => {
        if (isInitialized && isAuthenticated) {
            router.replace(paths.vendor.dashboard.index); // Redirect the vendor to the dashboard page if they are authenticated
        }
    }, [isInitialized, isAuthenticated, router]);

    return children;
}