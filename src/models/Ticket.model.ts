import mongoose from "mongoose";
import PRIORITIES from "../utils/priorityList";

const TicketSchema = new mongoose.Schema({
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
        enum: Object.values(PRIORITIES).map(p=>p.TITLE),
        default: "low"
    },
    status: {
        type: String,
        enum: ["open", "close"],
        default: "open"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please add a valid employee as assignedTo"],
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
    },

});


const TicketModel = mongoose.model("Ticket", TicketSchema);

export default TicketModel;
