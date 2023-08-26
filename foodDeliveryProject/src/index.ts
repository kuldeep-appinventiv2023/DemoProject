import express, { Request, Response } from "express";
import { connectToDatabase } from "./database/connection";

import adminRouter from "./routes/admin/profileRoutes";
import customerRouter from "./routes/customer/profileRoutes";

import adminRestaurantRouter from "./routes/admin/restaurantRoutes";
import customerRestaurantRouter from "./routes/customer/restaurantRoutes";

import adminCategoryRouter from "./routes/admin/categoryRoutes";
import customerCategoryRouter from "./routes/customer/categoryRoutes";

import adminMenuRouter from "./routes/admin/menuRoutes";
import customerMenuRouter from "./routes/customer/restaurantRoutes";

import adminDeliveryStaffRouter from "./routes/admin/deliveryStaffRoutes";

const app = express();
app.use(express.json());

connectToDatabase();

app.use(
  adminRouter,
  customerRouter,
  adminRestaurantRouter,
  customerRestaurantRouter,
  adminCategoryRouter,
  customerCategoryRouter,
  adminMenuRouter,
  customerMenuRouter,
  adminDeliveryStaffRouter
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hii.....");
});

const port = 4002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
