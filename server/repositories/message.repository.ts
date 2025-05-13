import { Types } from "mongoose";
import { DbService } from "../db/conn";

export class MessageRepository {
  constructor(private readonly _db: DbService) {}

  async createMessage(sender: Types.ObjectId, chatId: string, message: string) {
    const newMessage = new this._db.messageModel({
      sender,
      chat: chatId,
      message,
      status: "sent",
    });

    await newMessage.save();
    return newMessage;
  }
}
