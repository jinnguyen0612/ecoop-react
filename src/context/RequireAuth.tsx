import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


interface RequireAuthProps {
    children: ReactNode;
    roles: string[] | undefined;
}

interface DecodedToken {
    exp: number;
    data: Array<{
        username: string;
        phone: string;
        name_department: string;
        status: number;
    }>;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, roles }) => {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if(token){
            const decodedToken: DecodedToken = jwtDecode(token);
            if(decodedToken.exp * 1000 < Date.now()){
                localStorage.removeItem("accessToken");
                setUser({
                    username:"",
                    phone: "",
                    position: "",
                    status: -1,
                });
            } else{
                const newUser = {
                    username: decodedToken.data[0].username,
                    phone: decodedToken.data[0].phone,
                    position: decodedToken.data[0].name_department === "Phòng kế toán" ? "Accounting" : "Admin",
                    status: decodedToken.data[0].status,
                };
                setUser(newUser);
            }

        }
        setLoading(false);
    }, [setUser]);


    if (loading) {
        // Có thể trả về một component loading hoặc null khi đang kiểm tra `localStorage`
        return <div>Loading...</div>;
    }

    if (user.status===-1) {
        // Nếu không có user, điều hướng tới trang đăng nhập
        return <Navigate to="/auth/login" />;
    } else if (roles?.includes(user.position)) {
        return <>{children}</>;
    } else {
        return <Navigate to="/error404" />;
    }
};

