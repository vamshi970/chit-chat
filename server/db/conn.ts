import mongoose from "mongoose";
import { userSchema } from "../models/user.model";
import { IUser } from "../interfaces/userI";
import { env } from "../helpers";
import { IFriendRequest } from "../interfaces/requestI";
import { friendRequestSchema } from "../models/request.model";
import { IChat } from "../interfaces/chatI";
import { chatSchema } from "../models/chat.model";
import { IMessage } from "../interfaces/messageI";
import { messageSchema } from "../models/message.model";
const MONGO_URI = env.MONGO_URI;

export class DbService {
  private readonly _db: mongoose.Connection;

  constructor() {
    this._db = mongoose.connection;
  }

  async connect() {
    mongoose.connect(MONGO_URI);
    console.log("MONG0DB CONNECTED");
  }

  get userModel() {
    return this._db.model<IUser>("User", userSchema);
  }

  get requestModel() {
    return this._db.model<IFriendRequest>("FriendRequest", friendRequestSchema);
  }

  get chatModel() {
    return this._db.model<IChat>("Chat", chatSchema);
  }

  get messageModel() {
    return this._db.model<IMessage>("Message", messageSchema);
  }
}
