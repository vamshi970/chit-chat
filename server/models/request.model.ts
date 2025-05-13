import { Schema, model, Document } from "mongoose";
import { IFriendRequest } from "../interfaces/requestI";

export const friendRequestSchema = new Schema<IFriendRequest>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
