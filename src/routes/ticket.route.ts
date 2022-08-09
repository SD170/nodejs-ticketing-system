import { Router } from "express";
import { createTicket } from "../controllers/ticket.controller";


const router = Router();

router.route("/new").post(createTicket);

export default router;
