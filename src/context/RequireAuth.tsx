import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import { ReactNode } from "react";

interface RequireAuthProps {
    children: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const auth = useAuth();

    if (!auth?.user) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>;
};
