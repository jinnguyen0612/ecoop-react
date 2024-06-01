import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "./axios";

interface UserLogin {
    username: string;
    password: string;
}

interface User {
    username: string;
    phone: string;
    position: string;
    status: number;
}

interface AuthContextType {
    user: User | null;
    login: (payload: UserLogin) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (payload: UserLogin) => {
        try {
            const response = await axios.post(axios.defaults.baseURL + "/employee/login", payload);
            const userData = response.data; // Assume response has user data
            console.log("auth");
            console.log(userData);
            
            // Store accessToken in localStorage
            localStorage.setItem("accessToken", userData.accessToken);
            return userData
        } catch (error) {
            // Handle login error
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{ user,setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
