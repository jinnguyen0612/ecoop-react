import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "./axios";
import { jwtDecode } from "jwt-decode";

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
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    login: (payload: UserLogin) => Promise<User | null>;
    logout: () => void;
}



const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>({
        username: "",
        phone: "",
        position: "",
        status: -1,
    });

    const login = async (payload: UserLogin): Promise<any | null> => {
        try {
            const response = await axios.post("/employee/login", payload);
            const data = response.data;
            const userData = response.data.response[0];
            localStorage.setItem("accessToken", data.access_token);

            const newUser = {
                username: userData.username,
                phone: userData.phone,
                position: userData.name_department === "Phòng kế toán" ? "Accounting" : "Admin",
                status: userData.status,
            };
            setUser(newUser);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = async () => {
        setUser({
            username:"",
            phone: "",
            position: "",
            status: -1,
        });
        localStorage.removeItem("accessToken");
    };

    // const [logs, setLogs] = useState<string[]>([]);
    // useEffect(() => {
    //     const socket = new WebSocket('ws://192.168.1.71:3030');

    //     socket.onopen = () => {
    //         console.log('Connected to WebSocket server');
    //     };

    //     socket.onmessage = (event) => {
    //         setLogs((prevLogs) => [...prevLogs, event.data]);
    //         console.log(logs)
    //     };

    //     socket.onclose = () => {
    //         console.log('Disconnected from WebSocket server');
    //     };

    //     socket.onerror = (error) => {
    //         console.error('WebSocket error', error);
    //     };

    //     // Clean up the WebSocket connection when the component is unmounted
    //     return () => {
    //         socket.close();
    //     };
    // }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
