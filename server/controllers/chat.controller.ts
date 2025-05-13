import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { CHAT_MESSAGE, STATUS_BAD_REQUEST, STATUS_OK } from "../src/constants";
import { ApiResponse } from "../utils/ApiResponse";
import { onlineUserIds } from "../src/socket";
import { chatService } from "../src/server";

/*---------------------- @CHATS ---------------------*/

/*---------------- Get All Chats of a User  ------------------*/

export const getAllChats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) return;

  const chats = await chatService.getAllChats(userId);

  res.status(200).json(new ApiResponse(200, chats, "Successfully retrieved all chats"));
});

/*---------------- Get Chat  ------------------*/

export const getChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.params;

  const chat = await chatService.getChat(chatId);

  res.status(200).json(new ApiResponse(200, chat, "Successfully retrieved chat"));
});

/*---------------- Delete Chat  ------------------*/

export const deleteChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.params;

  const chat = await chatService.deleteChat(chatId);

  res.status(200).json(new ApiResponse(200, chat, "Successfully deleted chat"));
});

/*---------------------- @MESSAGES ---------------------*/

//create message

export const sendMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;
  const { chatId } = req.params;
  const userId = req.userId;

  if (!message || !chatId || !userId) {
    throw new ApiError(STATUS_BAD_REQUEST, "Invalid request");
  }

  const { newMessage, chat } = await chatService.sendMessage(userId, chatId, message);

  res.status(200).json(new ApiResponse(STATUS_OK, newMessage, "Message sent successfully"));

  const members = chat.members.filter((member) => member !== userId);

  const membersSocketIds = members.map((member) => {
    const userSocketId = onlineUserIds.get(member.toString()) as string;
    return userSocketId;
  });

  req.app.get("io").to(membersSocketIds).emit(CHAT_MESSAGE, newMessage);
});

//edit message
//delete message

/*---------------------- @GROUPS ---------------------*/
//create group
//rename group
//delete group
//add admin
//add member to group
//remove member from group
//exit group
