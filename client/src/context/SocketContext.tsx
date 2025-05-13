import { createContext } from "react";
import socketio from "socket.io-client";

type SocketContextType = {
  onlineUsers: string[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>;
  typingUsers: string[];
  setTypingUsers: React.Dispatch<React.SetStateAction<string[]>>;
  socket: ReturnType<typeof socketio> | null;
};

const SocketContextValue = {
  onlineUsers: [],
  setOnlineUsers: () => {},
  typingUsers: [],
  setTypingUsers: () => {},
  socket: null,
};

const SocketContext = createContext<SocketContextType>(SocketContextValue);

export default SocketContext;
