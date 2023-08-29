"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menuModel_1 = __importDefault(require("../../models/menuModel"));
const constants_1 = require("../../constants");
class MenuService {
    async getAllMenuItems() {
        try {
            const allMenuItems = await menuModel_1.default.find();
            return allMenuItems;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.fetchMenuItemsError);
        }
    }
    async getMenuItemById(menuItemId) {
        try {
            const menuItem = await menuModel_1.default.findById(menuItemId);
            if (!menuItem) {
                throw new Error(constants_1.Constants.errorMsgs.menuItemNotFound);
            }
            return menuItem;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.fetchMenuItemByIDError);
        }
    }
    async getMenuItemsByRestaurantName(restaurantName) {
        try {
            const menuItems = await menuModel_1.default.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "category",
                    },
                },
                {
                    $match: {
                        "category.restaurantName": restaurantName,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        menuName: 1,
                        image: 1,
                    },
                },
            ]);
            return menuItems;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.menuItemNotFound);
        }
    }
    async getMenuItemsByCategory(categoryId) {
        try {
            const menuItems = await menuModel_1.default.find({ categoryId });
            return menuItems;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.fetchMenuItemsByCategoryError);
        }
    }
}
exports.default = new MenuService();
//# sourceMappingURL=menuServices.js.map