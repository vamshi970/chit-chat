import { FilterQuery, Types } from "mongoose";
import { DbService } from "../db/conn";
import { IUser } from "../interfaces/userI";

export class UserRepository {
  constructor(private readonly _db: DbService) {}

  async createUser(userObj: {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
  }) {
    return await this._db.userModel.create(userObj);
  }

  async getUserById(id: Types.ObjectId): Promise<IUser | null> {
    return await this._db.userModel.findById(id);
  }

  async getUser(query: FilterQuery<IUser>): Promise<IUser | null> {
    return await this._db.userModel.findOne(query);
  }

  async getUserProfile(id: Types.ObjectId): Promise<Partial<IUser> | null> {
    return this._db.userModel.findById(id).select("firstName lastName email about avatar verified notifications friends");
  }

  async getUserNotifications(id: Types.ObjectId): Promise<IUser | null> {
    return this._db.userModel.findById(id).populate({
      path: "notifications.sender",
      select: "firstName avatar",
    });
  }

  async getAllUsersExceptFriends(id: Types.ObjectId, user: IUser): Promise<IUser[]> {
    return this._db.userModel
      .find({
        _id: { $nin: [...user.friends.map((friend) => friend.id), id] },
      })
      .select("firstName about avatar");
  }

  updateUserById(id: Types.ObjectId, modifyObj: Partial<IUser>): Promise<IUser | null> {
    return this._db.userModel.findByIdAndUpdate(id, modifyObj, {
      new: true,
      validateModifiedOnly: true,
    });
  }

  updateUserByEmail(email: string, modifyObj: Partial<IUser>): Promise<IUser | null> {
    /*
        validateModifiedOnly -> If u have any validations set in the mongoose model
                                then those validators run for only to the properties those who are changing if u set this option to true
    */
    return this._db.userModel.findOneAndUpdate({ email }, modifyObj, {
      new: true,
      validateModifiedOnly: true,
    });
  }
}
