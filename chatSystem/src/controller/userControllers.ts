import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Constants } from "../constants";
import User from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

export class UserController {
  static async Signup(req: Request, res: Response) {
    try {
      const { firstname, lastname, password, phoneNo } = req.body;
      const existingUser = await User.findOne({ phoneNo });

      if (existingUser)
        return res.status(Constants.HttpStatusCodes.BadRequest).json({ message: Constants.errorMsgs.userExists });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstname,
        lastname,
        password: hashedPassword,
        phoneNo,
      });
      await newUser.save();
      res.status(Constants.HttpStatusCodes.Created).json({ message: Constants.successMessages.userRegistered });
    } 
    catch (error) {
      res.status(Constants.HttpStatusCodes.InternalServerError).json({ message: Constants.errorMsgs.error });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { phoneNo, password } = req.body;
      const user = await User.findOne({ phoneNo });
      if (!user) return res.status(404).json({ message: Constants.errorMsgs.userNotFound });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      const secretKey = process.env.SECRET_KEY;
      
      if (!isPasswordValid)
        return res.status(Constants.HttpStatusCodes.Unauthorized).json({ message: Constants.errorMsgs.invalidPassword });

      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "2h" });
      res.status(Constants.HttpStatusCodes.OK).json({ token });
    } 
    catch (error) {
      res.status(Constants.HttpStatusCodes.InternalServerError).json({ message: Constants.errorMsgs.error });
    }
  }
}
