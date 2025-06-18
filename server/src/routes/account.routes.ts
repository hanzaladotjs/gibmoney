
import Router from "express"
import { balance } from "../controllers/account.controller"
import authMiddleware from "../middlewares/auth"
import { Send } from "../controllers/account.controller"

const router = Router()

router.get("/balance", authMiddleware, balance)
router.put("/send/", authMiddleware, Send)

export default router


