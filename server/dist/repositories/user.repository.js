"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(_db) {
        this._db = _db;
    }
    createUser(userObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.userModel.create(userObj);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.userModel.findById(id);
        });
    }
    getUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.userModel.findOne(query);
        });
    }
    getUserProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._db.userModel.findById(id).select("firstName lastName email about avatar verified notifications friends");
        });
    }
    getUserNotifications(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._db.userModel.findById(id).populate({
                path: "notifications.sender",
                select: "firstName avatar",
            });
        });
    }
    getAllUsersExceptFriends(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._db.userModel
                .find({
                _id: { $nin: [...user.friends.map((friend) => friend.id), id] },
            })
                .select("firstName about avatar");
        });
    }
    updateUserById(id, modifyObj) {
        return this._db.userModel.findByIdAndUpdate(id, modifyObj, {
            new: true,
            validateModifiedOnly: true,
        });
    }
    updateUserByEmail(email, modifyObj) {
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
exports.UserRepository = UserRepository;
