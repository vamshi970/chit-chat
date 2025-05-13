import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ContactType } from "../types/user.types";
import { fetchChat, fetchChats, fetchContacts, sendMessage } from "../api/chat";
import { ConversationType, CurrentChatType, MessageStatus, MessageType } from "../types/chat.types";
import useAuth from "./context/useAuth";

/*----------Contacts Query----------*/
export const useContactsQuery = () => {
  const { data, isLoading, isSuccess, isError } = useQuery<ContactType[]>({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
    retry: 1,
    //when set to false, the query will not refetch on mount (default: true)
    // refetchOnMount: false,

    //its denoting the time after which the data will be considered stale
    // staleTime : Infinity -> data will never be considered stale
    // so the data will be refetched only when the query is invalidated
    staleTime: Infinity,
  });

  return { data, isLoading, isSuccess, isError };
};

/*----------Conversations Query----------*/
export const useConversationsQuery = () => {
  const {
    data: conversations,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ConversationType[]>({
    queryKey: ["chats"],
    queryFn: fetchChats,
    retry: 1,
    staleTime: Infinity,
  });

  return { conversations, isLoading, isError, isSuccess };
};

/*----------Conversation Query----------*/
export const useConversationQuery = (currentChat: CurrentChatType | null) => {
  const { data: messages, refetch } = useQuery<MessageType[]>({
    queryKey: ["chat"],
    queryFn: () => fetchChat(currentChat?.chatId),
  });
  return { messages, refetch };
};

/*----------Message Mutation----------*/
export const useMessageMutation = () => {
  const client = useQueryClient();
  const { user } = useAuth();

  const { mutate } = useMutation({
    mutationFn: sendMessage,

    onMutate: (message) => {
      const optimisticMessage: MessageType = {
        _id: Math.random().toString(),
        sender: user?._id || "",
        chat: message.chatId,
        message: message.message,
        status: MessageStatus.Optimistic,
      };

      client.cancelQueries({ queryKey: ["chat"] });

      client.setQueryData(["chat"], (prev: MessageType[]) => [...prev, optimisticMessage]);

      return { optimisticMessage };
    },
    onSuccess: (data, _, { optimisticMessage }) => {
      client.setQueryData(["chat"], (prev: MessageType[]) =>
        prev.map((message) => {
          if (message._id === optimisticMessage._id) {
            return data;
          }
          return message;
        })
      );
    },
    onError: (error, _, context) => {
      if (!context) return;
      console.log(error.message);
      client.setQueryData(["chat"], (prev: MessageType[]) =>
        prev.filter((message) => message._id !== context.optimisticMessage._id)
      );
    },
  });

  return { mutate };
};
