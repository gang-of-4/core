"use client"
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// GuestGuard component is used to protect routes that require the user to be a guest, e.g. login and register pages
export function GuestGuard({ children }) {
    const router = useRouter(); // Move the useRouter hook inside the GuestGuard component
    const { isAuthenticated } = useAuth();

    // Check if the user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/'); // Redirect the user to the home page if they are authenticated
        }
    }, [isAuthenticated, router]);

    return children;
}