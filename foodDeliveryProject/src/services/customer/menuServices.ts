import Menu from "../../models/menuModel";

class MenuService {
  async getAllMenuItems() {
    try {
      const allMenuItems = await Menu.find();
      return allMenuItems;
    } catch (error) {
      throw new Error('Error fetching all menu items');
    }
  }

  async getMenuItemById(menuItemId: string) {
    try {
      const menuItem = await Menu.findById(menuItemId);
      if (!menuItem) {
        throw new Error('Menu item not found');
      }
      return menuItem;
    } catch (error) {
      throw new Error('Error fetching menu item by ID');
    }
  }

  async getMenuItemsByRestaurantName(restaurantName: string) {
    try {
      const menuItems = await Menu.find({ restaurantName: { $regex: restaurantName, $options: 'i' } });
      return menuItems;
    } catch (error) {
      throw new Error('Error fetching menu items by restaurant name');
    }
  }

  async getMenuItemsByCategory(categoryId: string) {
    try {
      const menuItems = await Menu.find({ categoryId });
      return menuItems;
    } catch (error) {
      throw new Error('Error fetching menu items by category');
    }
  }
}

export default new MenuService();
