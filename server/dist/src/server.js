"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = exports.userService = exports.authService = exports.messageRepository = exports.chatRepository = exports.requestRepository = exports.userRepository = exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.resolve(__dirname, "../config.env"); //irrespective CWD path is fixed
dotenv_1.default.config({ path: envPath });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const conn_1 = require("../db/conn");
const socket_1 = require("./socket");
const user_repository_1 = require("../repositories/user.repository");
const auth_service_1 = require("../services/auth.service");
const helpers_1 = require("../helpers");
const user_service_1 = require("../services/user.service");
const request_repository_1 = require("../repositories/request.repository");
const chat_repository_1 = require("../repositories/chat.repository");
const message_repository_1 = require("../repositories/message.repository");
const chat_service_1 = require("../services/chat.service");
const server = http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: helpers_1.env.CORS_ORIGIN,
        credentials: true,
    },
});
app_1.default.set("io", exports.io);
(0, socket_1.socketConnection)(exports.io);
const PORT = 3000;
const dbService = new conn_1.DbService();
exports.userRepository = new user_repository_1.UserRepository(dbService);
exports.requestRepository = new request_repository_1.RequestRepository(dbService);
exports.chatRepository = new chat_repository_1.ChatRepository(dbService);
exports.messageRepository = new message_repository_1.MessageRepository(dbService);
exports.authService = new auth_service_1.AuthService(exports.userRepository);
exports.userService = new user_service_1.UserService(exports.userRepository, exports.requestRepository, exports.chatRepository);
exports.chatService = new chat_service_1.ChatService(exports.chatRepository, exports.messageRepository);
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
