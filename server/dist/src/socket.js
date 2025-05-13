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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnection = exports.onlineUserIds = void 0;
const ApiError_1 = require("../utils/ApiError");
const constants_1 = require("./constants");
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const onlineUsers = new Set();
const typingUsers = new Set();
exports.onlineUserIds = new Map();
const socketConnection = (io) => {
    io.on(constants_1.CONNECTION, (socket) => __awaiter(void 0, void 0, void 0, function* () {
        /*---------------- User Connected ------------------*/
        var _a;
        try {
            const token = (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.token;
            if (!token) {
                throw new ApiError_1.ApiError(constants_1.STATUS_UNAUTHORIZED, "Token not found");
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, helpers_1.env.JWT_SECRET);
            if (!decodedToken) {
                throw new ApiError_1.ApiError(constants_1.STATUS_UNAUTHORIZED, "Invalid Token");
            }
            const user = yield models_1.User.findById(decodedToken.id);
            if (!user) {
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User not found");
            }
            onlineUsers.add(user._id.toString());
            exports.onlineUserIds.set(user._id.toString(), socket.id);
            io.emit(constants_1.ONLINE, Array.from(onlineUsers));
            /*---------------- Sart Typing ------------------*/
            socket.on(constants_1.START_TYPING, (receiverId) => {
                const receiverSocketId = exports.onlineUserIds.get(receiverId);
                if (receiverSocketId) {
                    typingUsers.add(user._id.toString());
                    const userSocketIds = (0, helpers_1.getSocketId)(exports.onlineUserIds);
                    io.to(userSocketIds).emit(constants_1.TYPING, Array.from(typingUsers));
                }
            });
            /*----------------Stop Typing ------------------*/
            socket.on(constants_1.STOP_TYPING, (receiverId) => {
                const receiverSocketId = exports.onlineUserIds.get(receiverId);
                if (receiverSocketId) {
                    typingUsers.delete(user._id.toString());
                    const userSocketIds = (0, helpers_1.getSocketId)(exports.onlineUserIds);
                    io.to(userSocketIds).emit(constants_1.TYPING, Array.from(typingUsers));
                }
            });
            /*---------------- User Disconnected ------------------*/
            socket.on(constants_1.DISCONNECT, () => {
                if (user) {
                    onlineUsers.delete(user._id.toString());
                    exports.onlineUserIds.delete(user._id.toString());
                    typingUsers.delete(user._id.toString());
                }
                io.emit(constants_1.ONLINE, Array.from(onlineUsers));
                io.emit(constants_1.TYPING, Array.from(typingUsers));
            });
        }
        catch (error) {
            console.log(error.message);
        }
    }));
};
exports.socketConnection = socketConnection;
