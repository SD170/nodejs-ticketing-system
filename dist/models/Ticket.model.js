"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const priorityList_1 = __importDefault(require("../utils/priorityList"));
const TicketSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    priority: {
        type: String,
        enum: Object.values(priorityList_1.default).map(p => p.TITLE),
        default: "low"
    },
    status: {
        type: String,
        enum: ["open", "close"],
        default: "open"
    },
    assignedTo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please add a valid employee as assignedTo"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const TicketModel = mongoose_1.default.model("Ticket", TicketSchema);
exports.default = TicketModel;
