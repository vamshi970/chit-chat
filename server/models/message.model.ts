import mongoose, { model } from "mongoose";
import { IMessage } from "../interfaces/messageI";

export const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    status : {
        type : String,
        default : "sent",
        enum : ["sent","delivered","read"]
    }
}, { timestamps: true });

export const Message = model<IMessage>("Message",messageSchema );