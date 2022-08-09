import { Router } from "express";
import { welcomeDisplay } from "../controllers/home.controller";


const router = Router();

router.route("").get(welcomeDisplay);

export default router;
