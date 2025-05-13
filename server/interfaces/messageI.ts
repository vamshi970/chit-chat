import { Document, Types } from "mongoose";

export interface IMessage extends Document {
  sender: Types.ObjectId;
  message: string;
  chat: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
