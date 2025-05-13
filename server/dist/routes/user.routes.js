"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const protect_middleware_1 = require("../middleware/protect.middleware");
const router = express_1.default.Router();
/*-----  Get User Data ----- */
router.get("/all", protect_middleware_1.verify, user_controller_1.getAllUsersExceptFriends);
router.get("/me", protect_middleware_1.verify, user_controller_1.getUser);
/*------ Friend Request --------- */
router.post("/add-friend", protect_middleware_1.verify, user_controller_1.sendFriendRequest);
router.post("/accept-friend", protect_middleware_1.verify, user_controller_1.acceptFriendRequest);
router.delete("/remove-friend", protect_middleware_1.verify, user_controller_1.removeFriend);
/*------ Notifications --------- */
router.get("/notifications", protect_middleware_1.verify, user_controller_1.getNotifications);
//testing
router.get("/all-users", user_controller_1.getAllUsers);
exports.default = router;
