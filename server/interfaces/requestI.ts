import { Document, Schema } from "mongoose";

interface IFriendRequest extends Document {
    sender: Schema.Types.ObjectId; 
    receiver: Schema.Types.ObjectId; 
    status: "pending" | "accepted" | "rejected"; 
}

export { IFriendRequest };