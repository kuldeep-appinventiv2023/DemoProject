import express from 'express';
import { Request, Response } from "express";
import { connectToDatabase } from './database/connection';
import mqttRouter from './routes/mqttRoute';
import userRouter from './routes/userRoute';

const app = express();
app.use(express.json());

connectToDatabase();

app.use(mqttRouter, userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hii.....");
});

const port = 2002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
