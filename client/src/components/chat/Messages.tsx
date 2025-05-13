import { useEffect, useRef } from "react";
import useChat from "../../hooks/context/useChat";
import MessageList from "./MessageList";
import { useConversationQuery } from "../../hooks/chat";
import StartChat from "../ui/chat/StartChat";

const Messages = () => {
  const messageRef = useRef<HTMLDivElement | null>(null);

  const { currentChat } = useChat();

  const { messages, refetch } = useConversationQuery(currentChat);

  useEffect(() => {
    if (currentChat) {
      refetch();
    }
  }, [currentChat]);

  useEffect(() => {
    if (messageRef.current !== null) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-3 py-4 bg-messageBg h-full max-h-full overflow-auto">
      {messages && messages.length > 0 ? (
        <MessageList messages={messages} messageRef={messageRef} />
      ) : (
        <StartChat />
      )}
    </div>
  );
};

export default Messages;
