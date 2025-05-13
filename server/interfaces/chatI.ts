import { Document, Schema, Types } from "mongoose";

export interface IChat extends Document {
  isGroupChat: boolean;
  isArchived: boolean;
  members: Types.ObjectId[];
  lastMessage: string;
  messages: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
