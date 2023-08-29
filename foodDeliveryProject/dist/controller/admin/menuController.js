"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menuServices_1 = __importDefault(require("../../services/admin/menuServices"));
const constants_1 = require("../../constants");
class MenuItemController {
    async create(req, res) {
        const newMenuItemData = req.body;
        try {
            const newMenuItem = await menuServices_1.default.createMenuItem(newMenuItemData);
            res.status(201).json({ success: true, message: constants_1.Constants.successMsgs.menuItemCreated, menuItem: newMenuItem });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.menuItemCreationFailed });
        }
    }
    async update(req, res) {
        const menuItemId = req.params.id;
        const updateData = req.body;
        try {
            const updatedMenuItem = await menuServices_1.default.updateMenuItem(menuItemId, updateData);
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.menuItemUpdated, menuItem: updatedMenuItem });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.menuItemUpdateFailed });
        }
    }
    async delete(req, res) {
        const menuItemId = req.params.id;
        try {
            await menuServices_1.default.deleteMenuItem(menuItemId);
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.menuItemDeleted });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.menuItemDeletionFailed });
        }
    }
}
exports.default = new MenuItemController();
//# sourceMappingURL=menuController.js.map