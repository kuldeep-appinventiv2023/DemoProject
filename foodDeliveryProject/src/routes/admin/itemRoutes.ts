import express from 'express';
import { adminAuthMiddleware } from '../../middleware/adminJwtMiddleware';
import ItemController  from '../../controller/admin/itemController';

const adminItemRouter = express.Router();

adminItemRouter.post('/addItems', adminAuthMiddleware, ItemController.addItem);
adminItemRouter.put('/updateItemById/:id', adminAuthMiddleware, ItemController.updateItem);
adminItemRouter.delete('/deleteItemById/:id', adminAuthMiddleware, ItemController.deleteItem);

export default adminItemRouter;
