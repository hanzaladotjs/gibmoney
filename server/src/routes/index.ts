import { Router } from "express";
import userROuter from "./user.routes"
import userAccount from "./account.routes"

const router = Router()


console.log("Router loaded");

router.use("/user", userROuter)
router.use("/account", userAccount)


export default router