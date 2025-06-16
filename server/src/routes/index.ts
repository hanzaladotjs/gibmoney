import { Router } from "express";
import userROuter from "./user.routes"
const router = Router()


router.use("/user", userROuter)

