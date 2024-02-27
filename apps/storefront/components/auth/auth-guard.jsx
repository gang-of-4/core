"use client"
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { paths } from "ui/paths";

// AuthGuard component is used to protect routes that require authentication
export default function AuthGuard({ children, role }) {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {

        // Redirect to login page if user is not authenticated
        if (!isAuthenticated) {
            const searchParams = new URLSearchParams({ returnTo: globalThis.location.href }).toString();
            const href = `${paths.auth.login}?${searchParams}`; 
            router.replace(href);

        // Redirect to forbidden page if user does not have the required role
        } else if (role && user?.role.name !== role) {
            router.replace("/forbidden");

        // Set checked to true if authentication and role checks pass
        } else {
            setChecked(true);
        }
    }, [isAuthenticated, router]);

    // Call the check function when the component mounts
    useEffect(() => {
        check();
    }, []);

    // If the check has not been completed, return null
    if (!checked) {
        return null;
    }

    // If the check has been completed, return the children
    return <>{children}</>;
};