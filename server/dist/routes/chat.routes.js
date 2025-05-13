"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protect_middleware_1 = require("../middleware/protect.middleware");
const chat_controller_1 = require("../controllers/chat.controller");
const router = express_1.default.Router();
/*------- Chat Routes --------- */
router.get("/", protect_middleware_1.verify, chat_controller_1.getAllChats);
router.get("/:chatId", protect_middleware_1.verify, chat_controller_1.getChat);
router.delete("/:chatId", protect_middleware_1.verify, chat_controller_1.deleteChat);
/*------- Message Routes --------- */
router.post("/:chatId", protect_middleware_1.verify, chat_controller_1.sendMessage);
exports.default = router;
