import { Request, Response } from 'express';
import MenuService from '../../services/admin/menuServices';
import { Constants } from '../../constants';

class MenuItemController {
  async create(req: Request, res: Response) {
    const newMenuItemData = req.body;
    try {
      const newMenuItem = await MenuService.createMenuItem(newMenuItemData);
      res.status(201).json({ success: true, message: Constants.successMsgs.menuItemCreated, menuItem: newMenuItem });
    } catch (error) {
        console.log(error);
      res.status(500).json({ success: false, message: Constants.errorMsgs.menuItemCreationFailed });
    }
  }

  async update(req: Request, res: Response) {
    const menuItemId = req.params.id;
    const updateData = req.body;

    try {
      const updatedMenuItem = await MenuService.updateMenuItem(menuItemId, updateData);
      res.status(200).json({ success: true, message: Constants.successMsgs.menuItemUpdated, menuItem: updatedMenuItem });
    } catch (error) {
        console.log(error);
      res.status(500).json({ success: false, message: Constants.errorMsgs.menuItemUpdateFailed });
    }
  }

  async delete(req: Request, res: Response) {
    const menuItemId = req.params.id;

    try {
      await MenuService.deleteMenuItem(menuItemId);
      res.status(200).json({ success: true, message: Constants.successMsgs.menuItemDeleted });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: Constants.errorMsgs.menuItemDeletionFailed });
    }
  }
}

export default new MenuItemController();
