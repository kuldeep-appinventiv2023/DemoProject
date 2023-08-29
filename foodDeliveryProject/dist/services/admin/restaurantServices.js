"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantModel_1 = __importDefault(require("../../models/restaurantModel"));
const constants_1 = require("../../constants");
class RestaurantService {
    async addRestaurant(newRestaurantData) {
        const newRestaurant = new restaurantModel_1.default(newRestaurantData);
        await newRestaurant.save();
        return newRestaurant;
    }
    async updateRestaurantById(restaurantId, updateData) {
        try {
            const updatedRestaurant = await restaurantModel_1.default.findByIdAndUpdate(restaurantId, updateData, { new: true });
            return updatedRestaurant;
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteRestaurantById(restaurantId) {
        try {
            const deletedRestaurant = await restaurantModel_1.default.findByIdAndRemove(restaurantId);
            if (!deletedRestaurant) {
                throw new Error(constants_1.Constants.errorMsgs.restaurantNotFound);
            }
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.errorDeletingRestaurant);
        }
    }
}
exports.default = new RestaurantService();
//# sourceMappingURL=restaurantServices.js.map