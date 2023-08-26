import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel";
import { createClient } from "redis";
import { Constants } from "../constants";

interface JWTPayload {
  email: string;
}

export const secretKey = "kuldeep@321";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: Constants.errorMsgs.tokenMissing });
  }

  try {
    const decoded: any = jwt.verify(token, secretKey) as JWTPayload;
    const admin = await Admin.findOne({ email: decoded.email });

    if (!admin) {
      throw new Error(Constants.errorMsgs.unauthorized);
    }

    if (decoded.email !== admin.email) {
      const client = createClient();
      client.on("error", (error) => console.log("error"));
      await client.connect();
      const customerId = decoded.id;
      const redisKey: string = `customer:${customerId}`;
      const cachedData = await client.get(`${redisKey}`);
      if (cachedData) {
        const customerData = JSON.parse(cachedData);
        if (customerData.isActive == true) {
          next();
        } else {
          throw new Error(Constants.errorMsgs.sessionExpired);
        }
      } else {
        throw new Error(Constants.errorMsgs.sessionExpired);
      }
    } else {
      next();
    }
  } catch (error) {
    throw new Error(Constants.errorMsgs.error);
  }
}
