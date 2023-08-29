import { Request, Response } from 'express';
import  CartService  from '../../services/customer/cartServices';
import { Constants } from '../../constants';

class CartController {

async  addToCart(req: Request, res: Response) {
    try {
      const { itemId, quantity } = req.body;
      const customerId = req.body.customerId;

      await CartService.addItemToCart(customerId, itemId, quantity);

      return res.status(200).json({ message: Constants.successMsgs.ITEM_ADDED_SUCCESS});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: Constants.errorMsgs.ERROR_ADDING_ITEM });
    }
  };

  async getCart  (req: Request, res: Response) {
    try {
      const customerId = req.body.customerId; 
      const cart = await CartService.getCartByCustomerId(customerId);

      if (!cart) {
        return res.status(404).json({ message: Constants.errorMsgs.CART_NOT_FOUND });
      }

      return res.status(200).json({ cart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: Constants.errorMsgs.ERROR_FETCHING_CART });
    }
  };

  async updateCartItem(req: Request, res: Response) {
    try {
      const { itemId } = req.params;
      const { quantity = 1 } = req.body;
      const customerId = req.body.customerId;

      const cart = await CartService.updateCartItemQuantity(customerId, itemId, quantity);

      if (!cart) {
        return res.status(404).json({ message: Constants.errorMsgs.CART_NOT_FOUND });
      }

      return res.status(200).json({ message: Constants.successMsgs.ITEM_UPDATED_SUCCESS });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: Constants.errorMsgs.ERROR_UPDATING_ITEM });
    }
  };

  async removeCartItem(req: Request, res: Response) {
    try {
      const { itemId } = req.params;
      const customerId = req.body.customerId;

      const cart = await CartService.removeCartItem(customerId, itemId);

      if (!cart) {
        return res.status(404).json({ message: Constants.errorMsgs.CART_NOT_FOUND });
      }

      return res.status(200).json({ message: Constants.successMsgs.ITEM_REMOVED_SUCCESS});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: Constants.errorMsgs.ERROR_REMOVING_ITEM });
    }
  };
}

export default new CartController();
