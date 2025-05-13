import React, { useEffect, useRef } from "react";
import ChatHeader from "../../components/chat/ChatHeader";
import Messages from "../../components/chat/Messages";
import SendMessage from "../../components/chat/ChatInput";
import useChat from "../../hooks/context/useChat";
import NoChats from "../../components/ui/chat/NoChats";
import { useSocket } from "../../hooks/context/useSocket";
import useAuth from "../../hooks/context/useAuth";
import { SocketEvents } from "../../utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { ConversationType, MessageType } from "../../types/chat.types";

const Chat = React.memo(() => {
  const client = useQueryClient();

  const { currentChat } = useChat();
  const { user } = useAuth();
  const { setOnlineUsers, setTypingUsers, socket } = useSocket();

  const currentChatRef = useRef(currentChat);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  useEffect(() => {
    
    if (!user || !socket) return;

      socket.connect();

    const handleConnect = () => {
      console.log("User Connected");
    };

    const handleDisconnect = () => {
      console.log("User Disconnected");
    };

    const handleOnlineUsers = (users: string[]) => {
      console.log("Online Users", users);
      setOnlineUsers(users);
    };

    const handleTyping = (users: string[]) => {
      console.log("Typing Users", users);
      setTypingUsers(users);
    };

    const handleFriendRequest = ({ notifications }: { notifications: string[] }) => {

      console.log("Friend Request", notifications);

      client.setQueryData(["user"], (data: any) => {
        return { ...data, notifications };
      });
      client.invalidateQueries({ queryKey: ["notifications"] });
    };

    const handleAcceptRequest = () => {
      client.invalidateQueries({ queryKey: ["chats"] });
    };

    const handleChatMessage = (message: MessageType) => {
      if (message.sender !== user?._id && currentChatRef.current?.chatId === message.chat) {
        client.setQueryData(["chat"], (prev: MessageType[]) => [...prev, message]);
      }

      client.setQueryData(["chats"], (prev: ConversationType[]) => {
        if (!prev) return;

        const newChats = prev.map((chat: ConversationType) => {
          if (chat._id === message.chat) {
            return { ...chat, lastMessage: message.message };
          }
          return chat;
        });
        return newChats;
      });
    };

    socket.on(SocketEvents.CONNECT, handleConnect);
    socket.on(SocketEvents.DISCONNECT, handleDisconnect);
    socket.on(SocketEvents.ONLINE, handleOnlineUsers);
    socket.on(SocketEvents.TYPING, handleTyping);
    socket.on(SocketEvents.FRIEND_REQUEST, handleFriendRequest);
    socket.on(SocketEvents.ACCEPT_REQUEST, handleAcceptRequest);
    socket.on(SocketEvents.CHAT_MESSAGE, handleChatMessage);
    return () => {
      socket.off(SocketEvents.CONNECT, handleConnect);
      socket.off(SocketEvents.DISCONNECT, handleDisconnect);
      socket.off(SocketEvents.ONLINE, handleOnlineUsers);
      socket.off(SocketEvents.TYPING, handleTyping);
      socket.off(SocketEvents.FRIEND_REQUEST, handleFriendRequest);
      socket.off(SocketEvents.ACCEPT_REQUEST, handleAcceptRequest);
      socket.off(SocketEvents.CHAT_MESSAGE, handleChatMessage);

    };
  }, [socket]);

  if (currentChat === null) return <NoChats />;

  return (
    <section className="flex flex-col flex-1 max-h-screen">
      <ChatHeader currentChat={currentChat} />
      <Messages />
      <SendMessage />
    </section>
  );
});

export default Chat;
