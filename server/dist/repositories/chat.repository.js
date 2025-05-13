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
exports.ChatRepository = void 0;
class ChatRepository {
    constructor(_db) {
        this._db = _db;
    }
    createChat(members) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.chatModel.create({ members });
        });
    }
    getChatById(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.chatModel.findById(chatId);
        });
    }
    getAllChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.chatModel
                .find({ members: userId }, { isGroupChat: false })
                .populate("members", "firstName avatar")
                .select("-messages -__v -isGroupChat");
        });
    }
    getChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.chatModel
                .findById(chatId)
                .select("-__v -isGroupChat -members -createdAt -updatedAt -_id -isArchived")
                .populate("messages");
        });
    }
    deleteChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.chatModel.findByIdAndDelete(chatId);
        });
    }
}
exports.ChatRepository = ChatRepository;
