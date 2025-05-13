import mongoose, { Schema, Types, model } from "mongoose";
import { IChat } from "../interfaces/chatI";

//create a chat schema

export const chatSchema = new mongoose.Schema(
  {
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: String,
    },
    messages: [
      {
        type: Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export const Chat = model<IChat>("Chat", chatSchema);
