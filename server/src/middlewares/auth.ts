import { NextFunction, Request, Response } from "express";
import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const authMiddleware: any = async (
  req: any,
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

  if(!process.env.JWT_SECRET){
    throw new Error("Hi")
  }

  const authJWT: any = jwt.verify(yourKey, process.env.JWT_SECRET);

  req.userId = authJWT.userId;

  next();
};

export default authMiddleware;
