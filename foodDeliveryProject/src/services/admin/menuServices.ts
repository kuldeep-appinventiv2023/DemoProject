import Menu from '../../models/menuModel';
import { Constants } from '../../constants';

class MenuService {
    async createMenuItem(newMenuItemData: any) {
        try {
            const newMenuItem = new Menu(newMenuItemData);
            await newMenuItem.save();
            return newMenuItem;
        } catch (error) {
            throw new Error(Constants.errorMsgs.createMenuItemError);
        }
    }

    async updateMenuItem(menuItemId: string, updateData: any) {
        try {
            const updatedMenuItem = await Menu.findByIdAndUpdate(menuItemId, updateData, { new: true });
            return updatedMenuItem;
        } catch (error) {
            throw new Error(Constants.errorMsgs.updateMenuItemError);
        }
    }

    async deleteMenuItem(menuItemId: string) {
        try {
            const deletedMenuItem = await Menu.findByIdAndRemove(menuItemId);
            if (!deletedMenuItem) {
                throw new Error(Constants.errorMsgs.menuItemNotFound);
            }
        } catch (error) {
            throw new Error(Constants.errorMsgs.deleteMenuItemError);
        }
    }
}

export default new MenuService();
