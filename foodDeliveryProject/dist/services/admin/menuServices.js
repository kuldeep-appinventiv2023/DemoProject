"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menuModel_1 = __importDefault(require("../../models/menuModel"));
const constants_1 = require("../../constants");
class MenuService {
    async createMenuItem(newMenuItemData) {
        try {
            const newMenuItem = new menuModel_1.default(newMenuItemData);
            await newMenuItem.save();
            return newMenuItem;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.createMenuItemError);
        }
    }
    async updateMenuItem(menuItemId, updateData) {
        try {
            const updatedMenuItem = await menuModel_1.default.findByIdAndUpdate({ menuItemId }, { $set: { updateData } }, { new: true });
            return updatedMenuItem;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.updateMenuItemError);
        }
    }
    async deleteMenuItem(menuItemId) {
        try {
            const deletedMenuItem = await menuModel_1.default.findByIdAndRemove(menuItemId);
            if (!deletedMenuItem) {
                throw new Error(constants_1.Constants.errorMsgs.menuItemNotFound);
            }
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.deleteMenuItemError);
        }
    }
}
exports.default = new MenuService();
//# sourceMappingURL=menuServices.js.map