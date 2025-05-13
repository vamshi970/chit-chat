import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationsType, UserType } from "../types/user.types";
import {
  fetchNotifications,
  getUser,
  handleFriendRequest,
  sendFriendRequest,
} from "../api/user";
import { AxiosError } from "axios";

/*--------User Query--------*/
export const useUserQuery = () => {
  const {
    isLoading,
    data: user,
    isError,
    isSuccess,
  } = useQuery<UserType>({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnMount: false,
    retry: false,
  });

  return { user, isLoading, isError, isSuccess };
};

/*--------Notifications Query--------*/
export const useNotificationsQuery = () => {
  const { data, isLoading, isRefetching } = useQuery<NotificationsType[]>({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    retry: 1,
    staleTime: Infinity,
  });

  return { data, isLoading, isRefetching };
};


/*--------Notifications Mutation--------*/
export const useNotificationsMutation = () => {
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: handleFriendRequest,
    onMutate: (data) => {
      client.cancelQueries({ queryKey: ["notifications"] });
      const previousNotifications = client.getQueryData<NotificationsType[]>([
        "notifications",
      ]);

      const finalNotifications = previousNotifications?.filter(
        (notification) => notification.sender._id !== data.friendId
      );

      client.setQueryData<NotificationsType[]>(
        ["notifications"],
        finalNotifications
      );

      return { previousNotifications };
    },
    onError: (err: AxiosError, _, context) => {
      console.error(
        "Error from server:",
        (err.response?.data as Error).message
      );

      if (context === undefined) return;

      client.setQueryData<NotificationsType[]>(
        ["notifications"],
        context.previousNotifications
      );
    },

    onSuccess: (data) => {
      const notifications = data.data.notifications;
      if (!notifications) return;
      client.setQueryData(["user"], (data: any) => {
        return { ...data, notifications };
      });
    },
  });

  return {
    mutate,
  };
};

/*--------Friend Request Mutation--------*/
export const useFriendRequestMutation = () => {
  const { mutate } = useMutation({
    mutationFn: sendFriendRequest,
  });

  return {
    mutate,
  };
};
