import express from 'express';
import  { UserController } from "../controller/userControllers";

const userRouter = express.Router();

userRouter.post('/signup', UserController.Signup);
userRouter.post('/login', UserController.login);

export default  userRouter;
