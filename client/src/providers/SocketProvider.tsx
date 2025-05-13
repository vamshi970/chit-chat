import { ReactNode, useEffect, useState } from "react";
import SocketContext from "../context/SocketContext";
import socketio from "socket.io-client";
import useAuth from "../hooks/context/useAuth";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null);

  const {user} = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const url = import.meta.env.VITE_BASE_API_URL;

    const socket = socketio(url, {
      autoConnect: false,
      withCredentials: true,
      auth: token ? JSON.parse(token) : {},
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };

  }, [user]);

  // console.log("Socket Provider");

  return (
    <SocketContext.Provider
      value={{ onlineUsers, setOnlineUsers, typingUsers, setTypingUsers, socket }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
