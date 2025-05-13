import { ReactNode, useEffect, useState } from "react";
import ChatContext from "../context/ChatContext";
import { CurrentChatType } from "../types/chat.types";
import { useMessageMutation } from "../hooks/chat";
import { SocketEvents } from "../utils/constants";
import useAuth from "../hooks/context/useAuth";
import { useSocket } from "../hooks/context/useSocket";
type ChatProiderProps = {
  children: ReactNode;
};

const ChatProider = ({ children }: ChatProiderProps) => {
  const { socket } = useSocket();

  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentChat, setCurrentChat] = useState<CurrentChatType | null>(null);

  const { mutate } = useMessageMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(socket);
    if (!currentChat || !currentChat?.chatId || !socket) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit(SocketEvents.START_TYPING, user?._id);
    }

    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !currentChat || !currentChat?.chatId) return;

    mutate({ message, chatId: currentChat.chatId });
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;

    if (isTyping) {
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
        if (socket) {
          socket.emit(SocketEvents.STOP_TYPING, user?._id);
        }
      }, 2000);
    }

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [isTyping]);

  return (
    <ChatContext.Provider
      value={{
        message,
        setMessage,
        handleChange,
        handleSendMessage,
        handleKeyDown,
        currentChat,
        setCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProider;
