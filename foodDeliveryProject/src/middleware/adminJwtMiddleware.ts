import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Constants } from "../constants";

interface JWTPayload {
  email: string;
}

export const secretKey = "kuldeep@321";

export async function adminAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: Constants.errorMsgs.tokenMissing });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JWTPayload;

    const adminEmail = decoded.email;

    if (adminEmail == "kuldeepprajapati697@gmail.com") {
      req.body.email = decoded.email;
      next();
    } else {
      return res.status(401).json({ message: Constants.errorMsgs.adminUnauthorized });
    }
    
  } catch (error) {
    return res.status(401).json({ message: error });
  }
}
