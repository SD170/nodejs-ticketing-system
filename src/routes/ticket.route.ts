import { Router } from "express";
import { createTicket, getAllTickets } from '../controllers/ticket.controller';
import { authenticate, checkRole } from '../middlewares/permissions';
import ROLES from '../utils/roleList';

const router = Router();

router.route("/new").post(authenticate, checkRole(ROLES.ADMIN), createTicket);
router.route("/").get(authenticate, getAllTickets); // no direction for authenticate in docs
router.route("/all").get(authenticate, getAllTickets); // no direction for authenticate in docs

export default router;
