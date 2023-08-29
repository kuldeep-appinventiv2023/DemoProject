"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartModel_1 = __importDefault(require("../../models/cartModel"));
const itemModel_1 = __importDefault(require("../../models/itemModel"));
class CartService {
    async addItemToCart(customerId, itemId, quantity) {
        const item = await itemModel_1.default.findById(itemId);
        if (!item) {
            return null;
        }
        let cart = await cartModel_1.default.findOne({ customerId });
        const unit_price = item.price;
        const cartItem = {
            itemId,
            quantity,
            unit_price,
        };
        if (cart) {
            const existingItem = cart.items.find((item) => item.itemId.toString() == itemId);
            if (existingItem) {
                existingItem.quantity += quantity;
                cart.cartTotal = cart.cartTotal + unit_price * quantity;
            }
            else {
                cart.items.push(cartItem);
                cart.cartTotal = cart.cartTotal + unit_price * quantity;
            }
            await cart.save();
        }
        else {
            const cartTotal = quantity * unit_price;
            const newCart = new cartModel_1.default({
                customerId,
                items: [cartItem],
                cartTotal,
            });
            await newCart.save();
        }
    }
    async getCartByCustomerId(customerId) {
        const cart = await cartModel_1.default.findOne({ customerId });
        return cart;
    }
    async updateCartItemQuantity(customerId, itemId, quantity) {
        const cart = await cartModel_1.default.findOne({ customerId });
        if (!cart) {
            return null;
        }
        const existingItem = cart.items.find((item) => item.itemId.toString() == itemId);
        if (existingItem) {
            const oldQuantity = existingItem.quantity;
            const unit_price = existingItem.unit_price;
            const priceDifference = unit_price * (quantity - oldQuantity);
            existingItem.quantity = quantity;
            cart.cartTotal += priceDifference;
            await cart.save();
        }
        return cart;
    }
    async removeCartItem(customerId, itemId) {
        const cart = await cartModel_1.default.findOne({ customerId });
        if (!cart) {
            return null;
        }
        const existingItemIndex = cart.items.findIndex((item) => item.itemId.toString() === itemId.toString());
        if (existingItemIndex !== -1) {
            const removedItem = cart.items.splice(existingItemIndex, 1)[0];
            cart.cartTotal -= removedItem.quantity * removedItem.unit_price;
            if (cart.items.length === 0) {
                await cartModel_1.default.deleteOne({ _id: cart._id });
            }
            else {
                await cart.save();
            }
        }
        return cart;
    }
}
exports.default = new CartService();
//# sourceMappingURL=cartServices.js.map