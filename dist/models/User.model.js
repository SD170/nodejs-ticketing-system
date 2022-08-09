"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roleList_1 = __importDefault(require("../utils/roleList"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"],
        unique: true
    },
    role: {
        type: String,
        enum: Object.values(roleList_1.default),
        required: [true, "Please add a valid role"],
    },
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
