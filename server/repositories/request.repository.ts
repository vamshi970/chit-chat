import { Types } from "mongoose";
import { DbService } from "../db/conn";

export class RequestRepository {
  constructor(private readonly _db: DbService) {}

  async findFriendRequest(sender: Types.ObjectId, receiver: Types.ObjectId) {
    return this._db.requestModel.findOne({
      sender,
      receiver,
    });
  }

  async createFriendRequest(sender: Types.ObjectId, receiver: Types.ObjectId) {
    return this._db.requestModel.create({
      sender,
      receiver,
    });
  }
}
