"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantModel_1 = __importDefault(require("../../models/restaurantModel"));
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const constants_1 = require("../../constants");
class RestaurantService {
    async getAllRestaurants(ipage, perPage) {
        try {
            const restaurants = await restaurantModel_1.default.find()
                .skip((ipage - 1) * perPage)
                .limit(perPage);
            if (restaurants.length === 0) {
                throw new Error(constants_1.Constants.errorMsgs.restaurantNotFound);
            }
            else {
                return restaurants;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getRestaurantById(restaurantId) {
        console.log(restaurantId);
        try {
            const restaurant = await restaurantModel_1.default.findOne({ restaurantId });
            if (!restaurant) {
                throw new Error(constants_1.Constants.errorMsgs.restaurantNotFound);
            }
            return restaurant;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.invalidRestaurantId);
        }
    }
    async getRestaurantByName(restaurantName) {
        try {
            const restaurants = await restaurantModel_1.default.find({ restaurantName });
            return restaurants;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.invalidRestaurantName);
        }
    }
    async getRestaurantByCityName(City) {
        try {
            const restaurants = await restaurantModel_1.default.find({ City });
            return restaurants;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.invalidCityName);
        }
    }
    async getRestaurantsByCategoryName(categoryName) {
        try {
            const category = await categoryModel_1.default.findOne({ categoryName: categoryName });
            console.log(category);
            console.log(category.categoryName);
            const restaurants = await restaurantModel_1.default.find({ categoryId: category._id });
            return restaurants;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.fetchRestaurantsError);
        }
    }
}
exports.default = new RestaurantService();
//# sourceMappingURL=restaurantServices.js.map