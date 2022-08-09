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
exports.checkTicketClosingValidity = exports.checkRole = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const Ticket_model_1 = __importDefault(require("../models/Ticket.model"));
const async_1 = __importDefault(require("./async"));
const roleList_1 = __importDefault(require("../utils/roleList"));
const authenticate = (req, res, next) => {
    const AuthorizationHeader = req.header("Authorization");
    if (!AuthorizationHeader) {
        next(new ErrorResponse_1.default(`Access Denied`, 401));
    }
    const token = AuthorizationHeader.split(" ")[1];
    // checking for TOKEN_SECRET from env
    if (process.env.TOKEN_SECRET === undefined) {
        return next(new ErrorResponse_1.default("please provide a secret for jwt"));
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        next(new ErrorResponse_1.default(`Invalid Token`, 401));
    }
};
exports.authenticate = authenticate;
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role === role) {
            next();
        }
        else {
            next(new ErrorResponse_1.default(`Don't have permission`, 401));
        }
    };
};
exports.checkRole = checkRole;
exports.checkTicketClosingValidity = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.ticketID) {
        next(new ErrorResponse_1.default(`Please provide a ticketID`, 400));
    }
    const ticket = yield Ticket_model_1.default.findById(req.body.ticketID);
    if (!ticket) {
        next(new ErrorResponse_1.default(`There's no ticket with this ticketID`, 400));
    }
    if ((ticket === null || ticket === void 0 ? void 0 : ticket.status) === "close") {
        next(new ErrorResponse_1.default(`Ticket is already closed`, 400));
    }
    // @ts-ignore
    if (ticket.assignedTo.toString() !== req.user._id && req.user.role !== roleList_1.default.ADMIN) {
        next(new ErrorResponse_1.default(`You don't have permission to remove this ticket`, 400));
    }
    if (typeof ticket.priority === 'string') {
        req.ticketPriority = ticket.priority;
    }
    if (ticket.assignedTo._id) {
        req.ticketAssigned = ticket.assignedTo._id;
    }
    next();
}));
