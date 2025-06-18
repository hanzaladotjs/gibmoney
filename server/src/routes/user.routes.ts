import { Router } from "express";
import { getUsers, SignIn, signUp, update } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth";

 const router = Router()

router.get("/", getUsers)
router.post("/signup", signUp)
router.post("/sigin", SignIn)
router.put("/update", authMiddleware, update)

export default router
