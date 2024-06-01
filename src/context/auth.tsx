import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "./axios";

interface UserLogin {
    username: string;
    password: string;

}
interface User {
    username: string;
    phone: string;
    status: number;
}

interface AuthContextType {
    user: User | null;
    login: (payload: UserLogin) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (payload:any) => {
        return await axios.post(axios.defaults.baseURL + "/employee/login", {
          payload,
        });
      };

      const logout = async () => {
        setUser(null);
        await localStorage.RemoveDataStorage("accessToken");
      };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {

    return useContext(AuthContext);
}
