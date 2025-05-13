import { ConversationType } from "../../../types/chat.types";
import ConversationCard from "./ConversationCard";

interface ConversationListProps {
  conversations: ConversationType[];
}

const ConversationList = ({ conversations }: ConversationListProps) => {
  return (
    <div>
      {conversations?.map((conversation: ConversationType, index: number) => {
        return <ConversationCard key={index} conversation={conversation} />;
      })}
    </div>
  );
};

export default ConversationList;
