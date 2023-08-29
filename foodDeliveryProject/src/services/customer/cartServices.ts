import Cart from "../../models/cartModel";
import Item from "../../models/itemModel";

class CartService {
  async addItemToCart(customerId : any, itemId : any, quantity : any) {
    const item = await Item.findById(itemId);

    if (!item) {
      return null;
    }

    let cart = await Cart.findOne({ customerId });
    const unit_price: any = item.price;
    const cartItem = {
      itemId,
      quantity,
      unit_price,
    };

    if (cart) {
      const existingItem = cart.items.find(
        (item) => item.itemId.toString() == itemId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        cart.cartTotal = cart.cartTotal + unit_price * quantity;
      } else {
        cart.items.push(cartItem);
        cart.cartTotal = cart.cartTotal + unit_price * quantity;
      }

      await cart.save();
    } else {
      const cartTotal = quantity * unit_price;
      const newCart = new Cart({
        customerId,
        items: [cartItem],
        cartTotal,
      });

      await newCart.save();
    }
  }

  async getCartByCustomerId(customerId : any) {
    const cart = await Cart.findOne({ customerId });
    return cart;
  }

  async updateCartItemQuantity(customerId : any, itemId : any, quantity : any) {
    const cart = await Cart.findOne({ customerId });

    if (!cart) {
      return null;
    }

    const existingItem = cart.items.find(
      (item) => item.itemId.toString() == itemId
    );

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

  async removeCartItem(customerId : any, itemId : any) {
    const cart = await Cart.findOne({ customerId });

    if (!cart) {
      return null;
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.itemId.toString() === itemId.toString()
    );

    if (existingItemIndex !== -1) {
      const removedItem = cart.items.splice(existingItemIndex, 1)[0];
      cart.cartTotal -= removedItem.quantity * removedItem.unit_price;

      if (cart.items.length === 0) {
        await Cart.deleteOne({ _id: cart._id });
      } else {
        await cart.save();
      }
    }

    return cart;
  }
}

export default new CartService();
