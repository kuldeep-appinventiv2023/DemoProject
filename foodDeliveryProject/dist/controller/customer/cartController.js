"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartServices_1 = __importDefault(require("../../services/customer/cartServices"));
const constants_1 = require("../../constants");
class CartController {
    async addToCart(req, res) {
        try {
            const { itemId, quantity } = req.body;
            const customerId = req.body.customerId;
            await cartServices_1.default.addItemToCart(customerId, itemId, quantity);
            return res.status(200).json({ message: constants_1.Constants.successMsgs.ITEM_ADDED_SUCCESS });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ERROR_ADDING_ITEM });
        }
    }
    ;
    async getCart(req, res) {
        try {
            const customerId = req.body.customerId;
            const cart = await cartServices_1.default.getCartByCustomerId(customerId);
            if (!cart) {
                return res.status(404).json({ message: constants_1.Constants.errorMsgs.CART_NOT_FOUND });
            }
            return res.status(200).json({ cart });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ERROR_FETCHING_CART });
        }
    }
    ;
    async updateCartItem(req, res) {
        try {
            const { itemId } = req.params;
            const { quantity = 1 } = req.body;
            const customerId = req.body.customerId;
            const cart = await cartServices_1.default.updateCartItemQuantity(customerId, itemId, quantity);
            if (!cart) {
                return res.status(404).json({ message: constants_1.Constants.errorMsgs.CART_NOT_FOUND });
            }
            return res.status(200).json({ message: constants_1.Constants.successMsgs.ITEM_UPDATED_SUCCESS });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ERROR_UPDATING_ITEM });
        }
    }
    ;
    async removeCartItem(req, res) {
        try {
            const { itemId } = req.params;
            const customerId = req.body.customerId;
            const cart = await cartServices_1.default.removeCartItem(customerId, itemId);
            if (!cart) {
                return res.status(404).json({ message: constants_1.Constants.errorMsgs.CART_NOT_FOUND });
            }
            return res.status(200).json({ message: constants_1.Constants.successMsgs.ITEM_REMOVED_SUCCESS });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ERROR_REMOVING_ITEM });
        }
    }
    ;
}
exports.default = new CartController();
//# sourceMappingURL=cartController.js.map