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
exports.getAllUsers = exports.getNotifications = exports.removeFriend = exports.acceptFriendRequest = exports.sendFriendRequest = exports.getUser = exports.getAllUsersExceptFriends = void 0;
const models_1 = require("../models");
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiResponse_1 = require("../utils/ApiResponse");
const constants_1 = require("../src/constants");
const ApiError_1 = require("../utils/ApiError");
const server_1 = require("../src/server");
const socket_1 = require("../src/socket");
/*---------------- Get All Users  ------------------*/
exports.getAllUsersExceptFriends = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    if (!id)
        return;
    const users = yield server_1.userService.getAllUsersExceptFriends(id);
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, users, "Successfully retrieved all users except friends"));
}));
/*---------------- Get User Details  ------------------*/
exports.getUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    if (!id)
        return;
    const user = yield server_1.userService.getUser(id);
    res.status(200).json(new ApiResponse_1.ApiResponse(200, user, "Successfully retrieved user"));
}));
/*---------------- Send Friend Request  ------------------*/
exports.sendFriendRequest = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const { friendId } = req.body;
    console.log(friendId, typeof friendId);
    if (!id || !friendId)
        return;
    const friend = yield server_1.userService.sendFriendRequest(id, friendId);
    res.json(new ApiResponse_1.ApiResponse(200, {}, "Friend Requset Sent successfully"));
    server_1.io.to(socket_1.onlineUserIds.get(friendId)).emit(constants_1.FRIEND_REQUEST, {
        notifications: friend.notifications,
    });
}));
/*---------------- Accept or Reject Friend Request  ------------------*/
exports.acceptFriendRequest = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const { friendId, accept } = req.body;
    if (!id || !friendId) {
        throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User ID or Friend ID not found");
    }
    const notifications = yield server_1.userService.acceptFriendRequest(id, friendId, accept);
    if (!accept) {
        res.json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, { notifications }, "Friend request rejected"));
        return;
    }
    res.json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, { notifications }, "Friend request accepted"));
    const friendSocketId = socket_1.onlineUserIds.get(friendId);
    const userSocketId = socket_1.onlineUserIds.get(id.toString());
    console.log(friendSocketId, userSocketId);
    const socketIds = [friendSocketId, userSocketId];
    server_1.io.to(socketIds).emit(constants_1.ACCEPT_REQUEST, {
        notifications,
    });
}));
/*---------------- Remove Friend ------------------*/
exports.removeFriend = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const { friendId } = req.body;
    if (!id || !friendId) {
        throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User or Friend not found");
    }
    yield server_1.userService.removeFriend(id, friendId);
    res.json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, {}, "Friend removed successfully"));
}));
/*---------------- Get All Notifications  ------------------*/
exports.getNotifications = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    if (!id)
        return;
    const notifications = yield server_1.userService.getNotifications(id);
    res.json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, notifications, "Notifications retrieved successfully"));
}));
/*---------------- Get All Users  ------------------*/
exports.getAllUsers = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.find({}).select("firstName about friends notifications email");
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, users, "Successfully retrieved all users except friends"));
}));
