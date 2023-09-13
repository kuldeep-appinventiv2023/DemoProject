import express from 'express';
import { authMiddleware } from '../../middleware/jwtMiddleware';
import ItemController  from '../../controller/customer/itemController';

const customerItemRouter = express.Router();

customerItemRouter.get('/getAllItems', authMiddleware, ItemController.getAllItems);
customerItemRouter.get('/getItemBy/:id', authMiddleware, ItemController.getItemById);

export default customerItemRouter;
