import dotenv from "dotenv";
import path from "path";
const envPath = path.resolve(__dirname, "../config.env"); //irrespective CWD path is fixed
dotenv.config({ path: envPath });
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { DbService } from "../db/conn";
import { socketConnection } from "./socket";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { env } from "../helpers";
import { UserService } from "../services/user.service";
import { RequestRepository } from "../repositories/request.repository";
import { ChatRepository } from "../repositories/chat.repository";
import { MessageRepository } from "../repositories/message.repository";
import { ChatService } from "../services/chat.service";
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: env.CORS_ORIGIN,
    credentials: true,
  },
});

app.set("io", io);

socketConnection(io);

const PORT = 3000;

const dbService = new DbService();

export const userRepository = new UserRepository(dbService);
export const requestRepository = new RequestRepository(dbService);
export const chatRepository = new ChatRepository(dbService);
export const messageRepository = new MessageRepository(dbService);

export const authService = new AuthService(userRepository);
export const userService = new UserService(userRepository, requestRepository, chatRepository);
export const chatService = new ChatService(chatRepository, messageRepository);

dbService
  .connect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("ERROR : MongoDB Connection Failed", error);
  });
