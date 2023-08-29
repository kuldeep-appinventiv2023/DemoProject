"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menuServices_1 = __importDefault(require("../../services/customer/menuServices"));
const constants_1 = require("../../constants");
class MenuController {
    async getAllMenuItems(req, res) {
        try {
            const allMenuItems = await menuServices_1.default.getAllMenuItems();
            res.status(200).json(allMenuItems);
        }
        catch (error) {
            res.status(500).json({ error: constants_1.Constants.errorMsgs.error });
        }
    }
    async getMenuItemById(req, res) {
        try {
            const { menuItemId } = req.params;
            const menuItem = await menuServices_1.default.getMenuItemById(menuItemId);
            res.status(200).json(menuItem);
        }
        catch (error) {
            res.status(500).json({ error: constants_1.Constants.errorMsgs.error });
        }
    }
    async getMenuItemsByRestaurantName(req, res) {
        const { restaurantName } = req.params;
        try {
            const menuItems = await menuServices_1.default.getMenuItemsByRestaurantName(restaurantName);
            res.status(200).json(menuItems);
        }
        catch (error) {
            res.status(500).json({ error: constants_1.Constants.errorMsgs.fetchMenuItemError });
        }
    }
    async getMenuItemsByCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const menuItems = await menuServices_1.default.getMenuItemsByCategory(categoryId);
            res.status(200).json(menuItems);
        }
        catch (error) {
            res.status(500).json({ error: constants_1.Constants.errorMsgs.error });
        }
    }
}
exports.default = new MenuController();
//# sourceMappingURL=menuController.js.map