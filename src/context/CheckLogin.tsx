import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


interface CheckLoginProps {
    children: ReactNode;
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

export const CheckLogin: React.FC<CheckLoginProps> = ({ children }) => {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    let token = localStorage.getItem("accessToken");

    useEffect(() => {
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
                token=null
            }
        }
        setLoading(false);
    }, []);


    if (loading) {
        // Có thể trả về một component loading hoặc null khi đang kiểm tra `localStorage`
        return <div>Loading...</div>;
    }

    if (token) {
        // Nếu không có user, điều hướng tới trang đăng nhập
        return <Navigate to="/" />;
    } else {
        return <>{children}</>;
    }
};

