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
exports.DbService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../models/user.model");
const helpers_1 = require("../helpers");
const request_model_1 = require("../models/request.model");
const chat_model_1 = require("../models/chat.model");
const message_model_1 = require("../models/message.model");
const MONGO_URI = helpers_1.env.MONGO_URI;
class DbService {
    constructor() {
        this._db = mongoose_1.default.connection;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default.connect(MONGO_URI);
            console.log("MONG0DB CONNECTED");
        });
    }
    get userModel() {
        return this._db.model("User", user_model_1.userSchema);
    }
    get requestModel() {
        return this._db.model("FriendRequest", request_model_1.friendRequestSchema);
    }
    get chatModel() {
        return this._db.model("Chat", chat_model_1.chatSchema);
    }
    get messageModel() {
        return this._db.model("Message", message_model_1.messageSchema);
    }
}
exports.DbService = DbService;
