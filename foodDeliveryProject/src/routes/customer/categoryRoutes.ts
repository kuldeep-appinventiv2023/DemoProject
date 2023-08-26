import express from 'express';
import { authMiddleware } from '../../middleware/jwtMiddleware';
import CategoryController from '../../controller/customer/categoryController';

const customerCategoryRouter = express.Router();

customerCategoryRouter.get('/viewAllCategories', authMiddleware, CategoryController.getAll);
customerCategoryRouter.get('/viewCategoryById/:id', authMiddleware, CategoryController.getById);
customerCategoryRouter.get('/viewCategoryByName', authMiddleware, CategoryController.getByName);

export default customerCategoryRouter;
