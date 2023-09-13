import express from 'express';
import { adminAuthMiddleware } from '../../middleware/adminJwtMiddleware';
import CategoryController from '../../controller/admin/categoryController';

const adminCategoryRouter = express.Router();

adminCategoryRouter.post('/addCategory', adminAuthMiddleware, CategoryController.add);

adminCategoryRouter.patch('/updateCategory/:id', adminAuthMiddleware, CategoryController.updateById);

adminCategoryRouter.delete('/deleteCategory/:id', adminAuthMiddleware, CategoryController.deleteById);

export default adminCategoryRouter;
