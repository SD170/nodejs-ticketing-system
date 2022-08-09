import { Router } from "express";
import { createUser } from "../controllers/user.controller";


const router = Router();

router.route("/new").post(createUser);

export default router;
