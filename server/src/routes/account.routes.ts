
import Router from "express"
import { balance } from "../controllers/account.controller"
import authMiddleware from "../middlewares/auth"

const router = Router()

router.get("/balance", authMiddleware, balance)
router.get("/send", authMiddleware, send)

export default router


