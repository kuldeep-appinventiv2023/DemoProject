import express from 'express';
import { authMiddleware } from '../../middleware/jwtMiddleware';
import CartController from '../../controller/customer/cartController';

const cartRouter = express.Router();

cartRouter.post('/addItemToCart', authMiddleware, CartController.addToCart);

cartRouter.get('/get-cart', authMiddleware, CartController.getCart);

cartRouter.put('/update-cart-item/:itemId', authMiddleware, CartController.updateCartItem);

cartRouter.delete('/remove-cart-item/:itemId', authMiddleware, CartController.removeCartItem);


export default cartRouter;
