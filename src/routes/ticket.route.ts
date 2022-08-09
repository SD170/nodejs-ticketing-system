import { Router } from "express";
import { createTicket, getAllTickets, closeTicket, deleteTicket } from '../controllers/ticket.controller';
import { authenticate, checkRole, checkTicketClosingValidity } from '../middlewares/permissions';
import ROLES from '../utils/roleList';

const router = Router();

router.route("/new").post(authenticate, checkRole(ROLES.ADMIN), createTicket);
router.route("/").get(getAllTickets); // no direction for authenticate in docs
router.route("/all").get(getAllTickets); // no direction for authenticate in docs
router.route("/markAsClosed").post(authenticate, checkTicketClosingValidity, closeTicket);
router.route("/delete").post(authenticate, checkRole(ROLES.ADMIN), deleteTicket);

export default router;
