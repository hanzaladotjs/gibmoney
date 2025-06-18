import { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Account } from "../models/account.model";

dotenv.config();

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  username: z.string(),
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
      message: "here at get users"
    });
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

    console.log("Router loaded");


    const user = await User.findOne({
      username: body.username,
    });

    if (user) {
      return res.json({
        message: "invalid",
      });
    }

    const createe = await User.create(body);

    await Account.create({
      userId: createe._id,
      balance: 1 + Math.random() * 1000,
    });

    const jwt1 = process.env.JWT_SECRET;

    const token = jwt.sign({ userId: createe._id }, jwt1 as string);

    res.json({
      message: "user created",
      token: token,
    });
  } catch (err) {
    res.status(404).json({
      message: "here at signup"
    })
  }
};

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { success } = loginSchema.safeParse(req.body);

    if (!success) {
      res.status(301).json({
        message: "incorrect inputs",
      });
    }

    const user: any = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user._id) {
      res.status(301).json({
        message: "user doesnt exist",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET as string
    );

    res.json({
      token: token,
    });
  } catch (e) {
    res.status(404).json({
      message: "here at signin"
    });
  }
};

export const update = async (req: any, res: Response) => {
  const { success } = userSchema.safeParse(req.body);

  if (!success) {
    res.status(301).json({
      message: "incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (user) {
    await User.updateOne({ _id: req.userId }, req.body);
  }
};
