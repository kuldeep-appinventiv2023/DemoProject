import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import deliveryStaff from "../models/deliveryStaffModel";
import { Constants } from "../constants";

interface JWTPayload {
  email: string;
}

export const deliverySecretKey = "delivery@321";

export async function deliveryStaffMiddleware( req: Request, res: Response, next: NextFunction ) {

  let token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: Constants.errorMsgs.tokenMissing });
  }
  try {
    const decoded = jwt.verify(token, deliverySecretKey) as JWTPayload;
    const deliveryStaffEmail = await deliveryStaff.findOne({ email: decoded.email });

    if (deliveryStaffEmail) {
      req.body.email = decoded.email;
      next();
    } else {
      return res.status(401).json({ message: Constants.errorMsgs.unauthorized });
    }
    
  } catch (error) {
    return res.status(401).json({ message: error });
  }
}
