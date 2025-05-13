import { Types } from "mongoose";
import { DbService } from "../db/conn";

export class ChatRepository {
  constructor(private readonly _db: DbService) {}

  async createChat(members: Types.ObjectId[]) {
    return await this._db.chatModel.create({ members });
  }

  async getChatById(chatId: string) {
    return await this._db.chatModel.findById(chatId);
  }

  async getAllChats(userId: Types.ObjectId) {
    return await this._db.chatModel
      .find({ members: userId }, { isGroupChat: false })
      .populate("members", "firstName avatar")
      .select("-messages -__v -isGroupChat");
  }

  async getChat(chatId: string) {
    return await this._db.chatModel
      .findById(chatId)
      .select("-__v -isGroupChat -members -createdAt -updatedAt -_id -isArchived")
      .populate("messages");
  }

  async deleteChat(chatId: string) {
    return await this._db.chatModel.findByIdAndDelete(chatId);
  }
}
