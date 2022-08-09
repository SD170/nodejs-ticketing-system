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
exports.deleteTicket = exports.closeTicket = exports.getAllTickets = exports.createTicket = void 0;
const Ticket_model_1 = __importDefault(require("../models/Ticket.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const async_1 = __importDefault(require("../middlewares/async"));
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const herlper_1 = require("../utils/herlper");
//  @desc       create a ticket
//  @route      POST /api/v1/tickets/new
//  @access     Private: Admin
exports.createTicket = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignedTo } = req.body;
    // fetching employee user from username
    if (!assignedTo) {
        return next(new ErrorResponse_1.default("Please provide a employee username with assignedTo"));
    }
    const employee = yield User_model_1.default.findOne({ username: assignedTo });
    // employe username validity check
    if (!employee) {
        return next(new ErrorResponse_1.default("Please provide a valid employee username"));
    }
    // creating a new ticket 
    const ticket = new Ticket_model_1.default(Object.assign(Object.assign({}, req.body), { assignedTo: employee === null || employee === void 0 ? void 0 : employee._id }));
    // saving the created user
    const savedTicket = yield ticket.save();
    res.status(200)
        .json({
        success: true,
        message: `Ticket created`,
        data: savedTicket,
    });
}));
//  @desc       get all tickets
//  @route      GET /api/v1/tickets
//  @access     Private
exports.getAllTickets = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allTickets = yield Ticket_model_1.default.find(Object.assign({}, req.query));
    res.status(200).json({
        success: true,
        message: `Ticket fetched successfully`,
        data: allTickets
    });
}));
//  @desc       close a ticket
//  @route      POST /api/v1/markAsClosed
//  @access     Private
exports.closeTicket = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketPriority = req.ticketPriority; // from checkTicketClosingValidity middleware
    const ticketAsignee = req.ticketAssigned; // from checkTicketClosingValidity middleware
    const higherPriorityArr = (0, herlper_1.getHigherPriorityTitles)(ticketPriority); // fething all the higher priorities
    const higherPriorityTickets = yield Ticket_model_1.default.find({
        assignedTo: ticketAsignee,
        priority: { $in: higherPriorityArr }
    });
    if (higherPriorityTickets.length > 0) {
        return res.status(400).json({
            success: false,
            message: `${higherPriorityTickets.length} higher priority task remains to be closed`,
            data: higherPriorityTickets
        });
    }
    // close the ticket
    const updatedTicket = yield Ticket_model_1.default.findByIdAndUpdate(req.body.ticketID, {
        status: "close"
    }, {
        new: true
    });
    res.status(200).json({
        success: true,
        message: `Ticket closed successfully`,
        data: updatedTicket
    });
}));
//  @desc       delete a ticket
//  @route      POST /api/v1/delete
//  @access     Private: Admin
exports.deleteTicket = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketID } = req.body;
    const deletedTicket = yield Ticket_model_1.default.findOneAndRemove({ ticketID });
    if (!deletedTicket) {
        return next(new ErrorResponse_1.default("no ticket to delete with this id", 400));
    }
    res.status(200).json({
        success: true,
        message: `Ticket deleted successfully`,
        data: deletedTicket
    });
}));
