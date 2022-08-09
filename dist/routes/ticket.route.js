"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_controller_1 = require("../controllers/ticket.controller");
const permissions_1 = require("../middlewares/permissions");
const roleList_1 = __importDefault(require("../utils/roleList"));
const router = (0, express_1.Router)();
router.route("/new").post(permissions_1.authenticate, (0, permissions_1.checkRole)(roleList_1.default.ADMIN), ticket_controller_1.createTicket);
router.route("/").get(ticket_controller_1.getAllTickets); // no direction for authenticate in docs
router.route("/all").get(ticket_controller_1.getAllTickets); // no direction for authenticate in docs
router.route("/markAsClosed").post(permissions_1.authenticate, permissions_1.checkTicketClosingValidity, ticket_controller_1.closeTicket);
router.route("/delete").post(permissions_1.authenticate, (0, permissions_1.checkRole)(roleList_1.default.ADMIN), ticket_controller_1.deleteTicket);
exports.default = router;
