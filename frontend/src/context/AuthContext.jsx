import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:5000';

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/me`, {
                withCredentials: true,
            });
            setUser(response.data.user);
            setIsAdmin(response.data.user?.isAdmin || false);
        } catch (error) {
            setUser(null);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    const login = (userData) => {
        setUser(userData);
        setIsAdmin(userData.isAdmin || false);
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
        setUser(null);
        setIsAdmin(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, login, logout, checkAuth, API_URL }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);