import useAuth from "../../hooks/context/useAuth";
import { MessageType } from "../../types/chat.types";
import TextMessage from "../ui/messages/TextMessage";

interface MessageListProps {
  messages: MessageType[];
  messageRef: React.RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, messageRef }: MessageListProps) => {
  const { user } = useAuth();

  return (
    <div >
      {messages.map((message, index) => {
        if (message.message) {
          return (
            <TextMessage
              key={index}
              message={message.message}
              isOwnMsg={message.sender === user?._id}
              status={message.status}
            />
          );
        }
        return null;
      })}
      <div ref={messageRef}></div>
    </div>
  );
};

export default MessageList;
