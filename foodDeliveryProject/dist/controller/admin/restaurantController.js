"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantServices_1 = __importDefault(require("../../services/admin/restaurantServices"));
const constants_1 = require("../../constants");
class RestaurantController {
    async add(req, res) {
        const newRestaurantData = req.body;
        try {
            const newRestaurant = await restaurantServices_1.default.addRestaurant(newRestaurantData);
            res.status(201).json({ success: true, message: constants_1.Constants.successMsgs.restaurantAdded, restaurant: newRestaurant });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.errorAddingRestaurant });
        }
    }
    async updateById(req, res) {
        const restaurantId = req.params.id;
        const updateData = req.body;
        try {
            const updatedRestaurant = await restaurantServices_1.default.updateRestaurantById(restaurantId, updateData);
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.restaurantUpdated, restaurant: updatedRestaurant });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.errorUpdatingRestaurant });
        }
    }
    async deleteById(req, res) {
        const restaurantId = req.params.id;
        try {
            await restaurantServices_1.default.deleteRestaurantById(restaurantId);
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.restaurantDeleted });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.errorDeletingRestaurant });
        }
    }
}
exports.default = new RestaurantController();
//# sourceMappingURL=restaurantController.js.map