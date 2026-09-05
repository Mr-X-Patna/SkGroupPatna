import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (url, options = {}) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        const socketInstance = io(url, {
            withCredentials: true,
            ...options,
        });

        socketRef.current = socketInstance;
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('🟢 Socket connected');
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            console.log('🔴 Socket disconnected');
            setIsConnected(false);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [url]);

    return { socket, isConnected };
};