import { User } from "../models";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import {
  ACCEPT_REQUEST,
  FRIEND_REQUEST,
  STATUS_CONFLICT,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "../src/constants";
import { ApiError } from "../utils/ApiError";
import { io, userService } from "../src/server";
import { onlineUserIds } from "../src/socket";

/*---------------- Get All Users  ------------------*/
export const getAllUsersExceptFriends = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;

    if (!id) return;

    const users = await userService.getAllUsersExceptFriends(id);

    res
      .status(200)
      .json(new ApiResponse(200, users, "Successfully retrieved all users except friends"));
  }
);

/*---------------- Get User Details  ------------------*/
export const getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.userId;

  if (!id) return;

  const user = await userService.getUser(id);

  res.status(200).json(new ApiResponse(200, user, "Successfully retrieved user"));
});

/*---------------- Send Friend Request  ------------------*/
export const sendFriendRequest = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const { friendId } = req.body;

    console.log(friendId,typeof friendId);

    if (!id || !friendId) return;

    const friend = await userService.sendFriendRequest(id, friendId);

    res.json(new ApiResponse(200, {}, "Friend Requset Sent successfully"));

    io.to(onlineUserIds.get(friendId) as string).emit(FRIEND_REQUEST, {
      notifications: friend.notifications,
    });
  }
);

/*---------------- Accept or Reject Friend Request  ------------------*/

export const acceptFriendRequest = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.userId;
    const { friendId, accept } = req.body;

    if (!id || !friendId) {
      throw new ApiError(STATUS_NOT_FOUND, "User ID or Friend ID not found");
    }

    const notifications = await userService.acceptFriendRequest(id, friendId, accept);

    if (!accept) {
      res.json(new ApiResponse(STATUS_OK, { notifications }, "Friend request rejected"));
      return;
    }

    res.json(new ApiResponse(STATUS_OK, { notifications }, "Friend request accepted"));

    const friendSocketId = onlineUserIds.get(friendId) as string;
    const userSocketId = onlineUserIds.get(id.toString()) as string;
    console.log(friendSocketId, userSocketId);
    const socketIds = [friendSocketId, userSocketId];

    io.to(socketIds).emit(ACCEPT_REQUEST, {
      notifications,
    });
  }
);

/*---------------- Remove Friend ------------------*/
export const removeFriend = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.userId;
  const { friendId } = req.body;

  if (!id || !friendId) {
    throw new ApiError(STATUS_NOT_FOUND, "User or Friend not found");
  }

  await userService.removeFriend(id, friendId);

  res.json(new ApiResponse(STATUS_OK, {}, "Friend removed successfully"));
});

/*---------------- Get All Notifications  ------------------*/
export const getNotifications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.userId;

  if (!id) return;

  const notifications = await userService.getNotifications(id);

  res.json(new ApiResponse(STATUS_OK, notifications, "Notifications retrieved successfully"));
});



/*---------------- Get All Users  ------------------*/
export const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const users = await User.find({}).select("firstName about friends notifications email");
  res
    .status(200)
    .json(new ApiResponse(200, users, "Successfully retrieved all users except friends"));
});
