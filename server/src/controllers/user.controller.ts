import { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";
import dotenv from "dotenv"
import jwt from "jsonwebtoken" 

dotenv.config() 

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({
      users: users,
    });
  } catch (error) {
    res.status(404).json({
        error: error
    })
  }
};

export const signUp = async (req: Request, res: Response): Promise<any> => {

  try {
    const body = req.body;
    const { success } = userSchema.safeParse(body);

    if (!success) {
      return res.json({
        message: "check your inputs",
      });
    }

    const user = await User.findOne({
      username: body.username,
    });

    if(user) {
        return res.json({
            message: "invalid"
        })
    }

    const createe = await User.create(body);

   
    const jwt1 = process.env.JWT_SECRET

    const token = jwt.sign({userId: createe._id}, jwt1 as string )

    res.json({
        message: "user created",
        token: token
    })
  } catch (err) {
    res.status(404);
  }
};

// export const SignIn =  (req: Request, res:Response) => {
//     try{

//         const unique  = req.body.username || req.body.email
//         const password = req.body.password

//     }catch(e) {
//         res.status(404).json({
//             message: e
//         })
//     }
// }
