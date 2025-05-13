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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const friendsSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Types.ObjectId, ref: "User" },
    firstName: String,
    avatar: String,
});
exports.userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
    },
    about: {
        type: String,
        default: "Hey there! I am using ChitChat.",
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    passwordChangedAt: {
        type: Date,
    },
    otp: {
        type: String,
    },
    otp_expiry_time: {
        type: Number,
    },
    friends: [friendsSchema],
    notifications: [
        {
            sender: {
                type: mongoose_1.Types.ObjectId,
                ref: "User",
            },
        },
    ],
}, { timestamps: true });
exports.userSchema.methods.correctPassword = (password, enteredPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield bcryptjs_1.default.compare(enteredPassword, password);
    return match;
});
exports.userSchema.methods.correctOtp = (otp, enteredOtp) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield bcryptjs_1.default.compare(enteredOtp, otp);
    return match;
});
exports.userSchema.methods.createPasswordResetToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        /*
            Create a set of random values and convert that to string
            of Hex values and store that in resetToken
        */
        const hashedResetToken = crypto_1.default.createHash("sha256").update(resetToken).digest("hex");
        // Hash that string
        this.passwordResetToken = hashedResetToken;
        this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10min
        yield this.save();
        return resetToken;
    });
};
exports.userSchema.methods.passwordChangedAfter = function (timestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = this.passwordChangedAt.getTime();
        return timestamp < changedTimeStamp;
    }
    // FALSE MEANS NOT CHANGED
    return false;
};
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
