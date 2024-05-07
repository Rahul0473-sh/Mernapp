import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSideBar, login, logout } from "../controller/user.controller.js";

const router = Router();

router.get("/", protectRoute, getUsersForSideBar);
router.post("/login", login);
router.post("/logout", logout);


export default router;