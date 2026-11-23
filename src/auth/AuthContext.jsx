//This file creates an authentication context so components across the app can access current user
and call login, register, or logout//
import { createContext, useContext, useEffect, useState } from "react";
import { request } from "./api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("beauty_calendar_token")) {
            setLoading(false);
            return;
        }

        request("/auth/me")
            .then((data) => setUser(data.user))
            .catch(() => localStorage.removeItem("beauty_calendar_token"))
            .finally(() => setLoading(false));
    }, []);

    async function login(email, password) {
        const data = await request("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });
        localStorage.setItem("beauty_calendar_token", data.token);
        setUser(data.user);
    }

    async function register(name, email, password) {
        const data = await request("/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password })
        });
        localStorage.setItem("beauty_calendar_token", data.token);
        setUser(data.user);
    }

    function logout() {
        localStorage.removeItem("beauty_calendar_token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
