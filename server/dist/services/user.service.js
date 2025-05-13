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
exports.UserService = void 0;
const constants_1 = require("../src/constants");
const ApiError_1 = require("../utils/ApiError");
class UserService {
    constructor(userRepo, requestRepo, chatRepo) {
        this.userRepo = userRepo;
        this.requestRepo = requestRepo;
        this.chatRepo = chatRepo;
    }
    getAllUsersExceptFriends(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.getUserById(id);
            if (!user) {
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User not found");
            }
            return yield this.userRepo.getAllUsersExceptFriends(id, user);
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.getUserProfile(id);
            if (!user) {
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User not found");
            }
            return user;
        });
    }
    sendFriendRequest(id, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.getUserById(id);
            const friend = yield this.userRepo.getUserById(friendId);
            if (!user || !friend) {
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User or Friend not found");
            }
            const existingFriendRequest = yield this.requestRepo.findFriendRequest(id, friendId);
            if (existingFriendRequest) {
                throw new ApiError_1.ApiError(constants_1.STATUS_CONFLICT, "Friend request already sent");
            }
            yield this.requestRepo.createFriendRequest(id, friendId);
            friend.notifications.push({
                sender: user._id,
            });
            yield friend.save();
            return friend;
        });
    }
    acceptFriendRequest(id, friendId, accept) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.getUserById(id);
            const friend = yield this.userRepo.getUserById(friendId);
            if (!user || !friend) {
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User or Friend not found");
            }
            const friendRequest = yield this.requestRepo.findFriendRequest(friendId, id);
            if (!friendRequest) {
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "Friend request not found");
            }
            if (!accept) {
                yield friendRequest.deleteOne();
                user.notifications = user.notifications.filter((notification) => notification.sender.toString() !== friendId.toString());
                yield user.save();
                return user.notifications;
            }
            user.friends.push({
                id: friendId,
                firstName: friend.firstName,
                avatar: friend.avatar,
            });
            user.notifications = user.notifications.filter((notification) => notification.sender.toString() !== friendId.toString());
            friend.friends.push({
                id: id,
                firstName: user.firstName,
                avatar: user.avatar,
            });
            yield Promise.all([user.save(), friend.save(), friendRequest.deleteOne()]);
            const members = [id, friendId];
            yield this.chatRepo.createChat(members);
            return user.notifications;
        });
    }
    removeFriend(id, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.getUserById(id);
            const friend = yield this.userRepo.getUserById(friendId);
            if (!user || !friend) {
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User or Friend not found");
            }
            user.friends = user.friends.filter((friend) => friend.id.toString() !== friendId.toString());
            friend.friends = friend.friends.filter((friend) => friend.id.toString() !== id.toString());
            yield Promise.all([user.save(), friend.save()]);
            return;
        });
    }
    getNotifications(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.getUserNotifications(id);
            if (!user) {
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User not found");
            }
            return user.notifications;
        });
    }
}
exports.UserService = UserService;
