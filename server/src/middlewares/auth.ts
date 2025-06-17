import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const authMiddleware:any= async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.json({
      message: "you can do better",
    });
  }

  const yourKey = authHeaders.split(" ")[1];
  const jwt_secret = process.env.JWT_SECRET;

  const authJWT = jwt.verify(yourKey, jwt_secret as string);

  res.json({
    userId: authJWT._id
  })

  next();
};

export default authMiddleware;
