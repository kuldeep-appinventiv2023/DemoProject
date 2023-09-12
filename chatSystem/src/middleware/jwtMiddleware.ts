import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Constants } from "../constants";
import dotenv from "dotenv";
dotenv.config();

export async function authMiddleware( req: Request, res: Response, next: NextFunction ) {

  let token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: Constants.authMessages.tokenMissing });
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const decoded : any = jwt.verify(token, secretKey);
    req.body.id = decoded._id;
    next();   
  } 
  catch (error) {
    return res.status(401).json({ message: Constants.errorMsgs.error });
  }
}
