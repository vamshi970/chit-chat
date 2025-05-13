import ConversationList from "../ui/dashboard/ConversationList";
import DashboardLoader from "../ui/loaders/DashboardLoader";
import { useConversationsQuery } from "../../hooks/chat";

type ConversationsProps = {
  archived?: boolean;
};

const Conversations = ({ archived = false }: ConversationsProps) => {
  const { conversations, isLoading, isError, isSuccess } =
    useConversationsQuery();

  
  if (isLoading) return <DashboardLoader />;

  if (isError) return <div>Error fetching data</div>;

  if (isSuccess && conversations)
    return (
      <div>
        {archived ? (
          <div>Archived</div>
        ) : (
          <>
            <div className="py-4">
              <p className="text-[13px] font-semibold text-[#676667]">
                All Chats
              </p>
              <ConversationList conversations={conversations} />
            </div>
          </>
        )}
      </div>
    );
};

export default Conversations;
