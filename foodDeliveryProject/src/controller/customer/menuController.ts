import Menu from "../../models/menuModel";
import { Constants } from '../../constants';

class MenuService {
  async getAllMenuItems() {
    try {
      const allMenuItems = await Menu.find();
      return allMenuItems;
    } catch (error) {
      throw new Error(Constants.errorMsgs.fetchMenuItemsError);
    }
  }

  async getMenuItemById(menuItemId: string) {
    try {
      const menuItem = await Menu.findById(menuItemId);
      if (!menuItem) {
        throw new Error(Constants.errorMsgs.menuItemNotFound);
      }
      return menuItem;
    } catch (error) {
      throw new Error(Constants.errorMsgs.fetchMenuItemByIDError);
    }
  }

  async getMenuItemsByRestaurantName(restaurantName: string) {
    try {
      const menuItems = await Menu.find({ restaurantName: { $regex: restaurantName, $options: 'i' } });
      return menuItems;
    } catch (error) {
      throw new Error(Constants.errorMsgs.fetchMenuItemsByRestaurantError);
    }
  }

  async getMenuItemsByCategory(categoryId: string) {
    try {
      const menuItems = await Menu.find({ categoryId });
      return menuItems;
    } catch (error) {
      throw new Error(Constants.errorMsgs.fetchMenuItemsByCategoryError);
    }
  }
}

export default new MenuService();
