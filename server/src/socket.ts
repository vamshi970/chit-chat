import { Server, Socket } from "socket.io";
import { IUser } from "../interfaces/userI";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ApiError } from "../utils/ApiError";
import {
  CONNECTION,
  DISCONNECT,
  ONLINE,
  START_TYPING,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED,
  STOP_TYPING,
  TYPING,
} from "./constants";
import { User } from "../models";
import jwt from "jsonwebtoken";
import { IJWT_PAYLOAD } from "../interfaces/tokenI";
import { Types } from "mongoose";
import { env, getSocketId } from "../helpers";

interface SocketUser extends IUser {
  _id: Types.ObjectId;
}

interface CustomSocket extends Socket {
  user?: SocketUser;
}

const onlineUsers = new Set<string>();
const typingUsers = new Set<string>();
export const onlineUserIds = new Map<string, string>();

export const socketConnection = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on(CONNECTION, async (socket: CustomSocket) => {
    /*---------------- User Connected ------------------*/

    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        throw new ApiError(STATUS_UNAUTHORIZED, "Token not found");
      }

      const decodedToken = jwt.verify(token, env.JWT_SECRET) as IJWT_PAYLOAD;

      if (!decodedToken) {
        throw new ApiError(STATUS_UNAUTHORIZED, "Invalid Token");
      }

      const user = await User.findById(decodedToken.id);

      if (!user) {
        throw new ApiError(STATUS_NOT_FOUND, "User not found");
      }

      onlineUsers.add(user._id.toString());
      onlineUserIds.set(user._id.toString(), socket.id);
      io.emit(ONLINE, Array.from(onlineUsers));
      /*---------------- Sart Typing ------------------*/
      socket.on(START_TYPING, (receiverId: string) => {
        const receiverSocketId = onlineUserIds.get(receiverId);
        if (receiverSocketId) {
          typingUsers.add(user._id.toString());
          const userSocketIds = getSocketId(onlineUserIds);
          io.to(userSocketIds).emit(TYPING, Array.from(typingUsers));
        }
      });

      /*----------------Stop Typing ------------------*/

      socket.on(STOP_TYPING, (receiverId: string) => {
        const receiverSocketId = onlineUserIds.get(receiverId);
        if (receiverSocketId) {
          typingUsers.delete(user._id.toString());
          const userSocketIds = getSocketId(onlineUserIds);
          io.to(userSocketIds).emit(TYPING, Array.from(typingUsers));
        }
      });

      /*---------------- User Disconnected ------------------*/
      socket.on(DISCONNECT, () => {
        if (user) {
          onlineUsers.delete(user._id.toString());
          onlineUserIds.delete(user._id.toString());
          typingUsers.delete(user._id.toString());
        }
        io.emit(ONLINE, Array.from(onlineUsers));
        io.emit(TYPING, Array.from(typingUsers));
      });
    } catch (error) {
      console.log((error as Error).message);
    }
  });
};
