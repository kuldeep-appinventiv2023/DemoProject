import express, { Request, Response } from "express";
import * as path from "path";
import * as YAML from "yamljs";
import { connectToDatabase } from "./database/connection";

import adminRouter from "./routes/admin/profileRoutes";
import customerRouter from "./routes/customer/profileRoutes";
import swaggerUi from 'swagger-ui-express';

import adminRestaurantRouter from "./routes/admin/restaurantRoutes";
import customerRestaurantRouter from "./routes/customer/restaurantRoutes";

import adminCategoryRouter from "./routes/admin/categoryRoutes";
import customerCategoryRouter from "./routes/customer/categoryRoutes";

import adminMenuRouter from "./routes/admin/menuRoutes";
import customerMenuRouter from "./routes/customer/restaurantRoutes";

import adminItemRouter from "./routes/admin/itemRoutes";
import customerItemRouter from "./routes/customer/itemRoutes";

import cartRouter from "./routes/customer/cartRoutes"

import adminDeliveryStaffRouter from "./routes/admin/deliveryStaffRoutes";

import orderRouter from "./routes/customer/orderRoutes";

const app = express();
app.use(express.json());

connectToDatabase();

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  adminRouter,
  customerRouter,
  adminRestaurantRouter,
  customerRestaurantRouter,
  adminCategoryRouter,
  customerCategoryRouter,
  adminMenuRouter,
  customerMenuRouter,
  adminItemRouter,
  customerItemRouter,
  cartRouter,
  adminDeliveryStaffRouter,
  orderRouter
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hii.....");
});

const port = 4002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


