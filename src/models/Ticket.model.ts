import mongoose from "mongoose";

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
    status: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "open"
    },
    priority: {
        type: String,
        enum: ["open", "close"],
        default: "open"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
    },

});


const TicketModel = mongoose.model("Ticket", TicketSchema);

export default TicketModel;
