import { Types } from "mongoose";
import { UserRepository } from "../repositories/user.repository";
import { STATUS_CONFLICT, STATUS_NOT_FOUND } from "../src/constants";
import { ApiError } from "../utils/ApiError";
import { RequestRepository } from "../repositories/request.repository";
import { ChatRepository } from "../repositories/chat.repository";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly requestRepo: RequestRepository,
    private readonly chatRepo: ChatRepository
  ) {}

  async getAllUsersExceptFriends(id: Types.ObjectId) {
    const user = await this.userRepo.getUserById(id);

    if (!user) {
      throw new ApiError(STATUS_NOT_FOUND, "User not found");
    }

    return await this.userRepo.getAllUsersExceptFriends(id, user);
  }

  async getUser(id: Types.ObjectId) {
    const user = await this.userRepo.getUserProfile(id);

    if (!user) {
      throw new ApiError(STATUS_NOT_FOUND, "User not found");
    }

    return user;
  }

  async sendFriendRequest(id: Types.ObjectId, friendId: Types.ObjectId) {
    const user = await this.userRepo.getUserById(id);
    const friend = await this.userRepo.getUserById(friendId);

    if (!user || !friend) {
      throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
    }

    const existingFriendRequest = await this.requestRepo.findFriendRequest(id, friendId);

    if (existingFriendRequest) {
      throw new ApiError(STATUS_CONFLICT, "Friend request already sent");
    }

    await this.requestRepo.createFriendRequest(id, friendId);

    friend.notifications.push({
      sender: user._id,
    });

    await friend.save();

    return friend;
  }

  async acceptFriendRequest(id: Types.ObjectId, friendId: Types.ObjectId, accept: boolean) {
    const user = await this.userRepo.getUserById(id);
    const friend = await this.userRepo.getUserById(friendId);

    if (!user || !friend) {
      throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
    }

    const friendRequest = await this.requestRepo.findFriendRequest(friendId, id);

    if (!friendRequest) {
      throw new ApiError(STATUS_NOT_FOUND, "Friend request not found");
    }

    if (!accept) {
      await friendRequest.deleteOne();

      user.notifications = user.notifications.filter(
        (notification) => notification.sender.toString() !== friendId.toString()
      );

      await user.save();

      return user.notifications;
    }

    user.friends.push({
      id: friendId,
      firstName: friend.firstName,
      avatar: friend.avatar,
    });

    user.notifications = user.notifications.filter(
      (notification) => notification.sender.toString() !== friendId.toString()
    );

    friend.friends.push({
      id: id,
      firstName: user.firstName,
      avatar: user.avatar,
    });

    await Promise.all([user.save(), friend.save(), friendRequest.deleteOne()]);

    const members = [id, friendId];

    await this.chatRepo.createChat(members);

    return user.notifications;
  }

  async removeFriend(id: Types.ObjectId, friendId: Types.ObjectId) {
    const user = await this.userRepo.getUserById(id);
    const friend = await this.userRepo.getUserById(friendId);

    if (!user || !friend) {
      throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
    }

    user.friends = user.friends.filter((friend) => friend.id.toString() !== friendId.toString());
    friend.friends = friend.friends.filter((friend) => friend.id.toString() !== id.toString());

    await Promise.all([user.save(), friend.save()]);

    return;
  }

  async getNotifications(id: Types.ObjectId) {
    const user = await this.userRepo.getUserNotifications(id);

    if (!user) {
      throw new ApiError(STATUS_NOT_FOUND, "User not found");
    }

    return user.notifications;
  }
}
