import express from "express";

import { verify } from "../middleware/protect.middleware";
import { deleteChat, getAllChats, getChat, sendMessage } from "../controllers/chat.controller";
const router = express.Router();


/*------- Chat Routes --------- */
router.get("/", verify, getAllChats);
router.get("/:chatId", verify, getChat);
router.delete("/:chatId", verify, deleteChat);


/*------- Message Routes --------- */
router.post("/:chatId", verify, sendMessage);



export default router;
