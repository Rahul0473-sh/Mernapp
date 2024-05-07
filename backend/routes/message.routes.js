import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessage, sendMessage } from "../controller/message.controller.js";
const router = Router();
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessage);

export default router;