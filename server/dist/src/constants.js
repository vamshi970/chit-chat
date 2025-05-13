"use strict";
/**
 * @STATUS_CODES
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCEPT_REQUEST = exports.FRIEND_REQUEST = exports.CHAT_MESSAGE = exports.STOP_TYPING = exports.START_TYPING = exports.TYPING = exports.ONLINE = exports.DISCONNECT = exports.CONNECTION = exports.STATUS_SERVER_ERROR = exports.STATUS_CONFLICT = exports.STATUS_NOT_FOUND = exports.STATUS_UNAUTHORIZED = exports.STATUS_BAD_REQUEST = exports.STATUS_OK = void 0;
exports.STATUS_OK = 200;
exports.STATUS_BAD_REQUEST = 400;
exports.STATUS_UNAUTHORIZED = 401;
exports.STATUS_NOT_FOUND = 404;
exports.STATUS_CONFLICT = 409;
exports.STATUS_SERVER_ERROR = 500;
/**
 * @SOCKET_EVENTS
 *
 */
exports.CONNECTION = "connection";
exports.DISCONNECT = "disconnect";
exports.ONLINE = "online";
exports.TYPING = "typing";
exports.START_TYPING = "start typing";
exports.STOP_TYPING = "stop typing";
exports.CHAT_MESSAGE = "chat message";
exports.FRIEND_REQUEST = "friend request";
exports.ACCEPT_REQUEST = "accept request";
