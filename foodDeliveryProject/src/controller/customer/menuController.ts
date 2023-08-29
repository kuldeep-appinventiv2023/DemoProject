import { Request, Response } from 'express';
import MenuService from '../../services/customer/menuServices';
import { Constants } from '../../constants';

class MenuController {
  async getAllMenuItems(req: Request, res: Response) {
    try {
      const allMenuItems = await MenuService.getAllMenuItems();
      res.status(200).json(allMenuItems);
    } catch (error) {
      res.status(500).json({ error: Constants.errorMsgs.error });
    }
  }

  async getMenuItemById(req: Request, res: Response) {
    try {
      const { menuItemId } = req.params;
      const menuItem = await MenuService.getMenuItemById(menuItemId);
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ error: Constants.errorMsgs.error });
    }
  }

  async getMenuItemsByRestaurantName(req: Request, res: Response) {
    const { restaurantName } = req.params;

    try {
      const menuItems = await MenuService.getMenuItemsByRestaurantName(restaurantName);
      res.status(200).json(menuItems);
    } 
    catch (error) {
      res.status(500).json({ error: Constants.errorMsgs.fetchMenuItemError});
    }
  }

  async getMenuItemsByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const menuItems = await MenuService.getMenuItemsByCategory(categoryId);
      res.status(200).json(menuItems);
    } catch (error) {
      res.status(500).json({ error: Constants.errorMsgs.error });
    }
  }
}

export default new MenuController();
