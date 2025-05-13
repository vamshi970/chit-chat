import { useNotificationsMutation } from "../../../hooks/user";
import { NotificationsType } from "../../../types/user.types";

interface FriendRequestCardProps {
  request: NotificationsType;
}

const FriendRequestCard = ({ request }: FriendRequestCardProps) => {
  const { mutate } = useNotificationsMutation();

  return (
    <div className="flex justify-between bg-gray-200 px-2 py-2 items-center rounded-lg my-3">
      <div className="text-lg">
        <h3>{request?.sender?.firstName}</h3>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            mutate({
              friendId: request?.sender?._id,
              accept: true,
            })
          }
          className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm"
        >
          Accept
        </button>
        <button
          onClick={() =>
            mutate({
              friendId: request?.sender?._id,
              accept: false,
            })
          }
          className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
