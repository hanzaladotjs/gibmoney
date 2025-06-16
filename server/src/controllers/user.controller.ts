import { Request, Response } from "express"
import { User } from "../models/user.model"

export const getUsers= (req: Request, res: Response ) => {
    try{
    const users = User.findOne()
    res.json({
        users: users
    })
    }catch(error) {
        res.json({
            error: error
        }).status(404)
    }
}
