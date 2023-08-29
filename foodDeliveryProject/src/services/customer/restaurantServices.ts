import Restaurant from "../../models/restaurantModel";
import Category from "../../models/categoryModel";
import { Constants } from "../../constants";

class RestaurantService {
  async getAllRestaurants(ipage:any,perPage:any) {
    try {
      const restaurants = await Restaurant.find()
      .skip((ipage - 1) * perPage)
      .limit(perPage);
      if (restaurants.length === 0) {
        throw new Error(Constants.errorMsgs.restaurantNotFound);
      } else {
        return restaurants;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getRestaurantById(restaurantId: any) {
    console.log(restaurantId);
    try {
      const restaurant = await Restaurant.findOne({restaurantId});
      if (!restaurant) {
        throw new Error(Constants.errorMsgs.restaurantNotFound);
      }
      return restaurant;
    } catch (error) {
      throw new Error(Constants.errorMsgs.invalidRestaurantId);
    }
  }

  async getRestaurantByName(restaurantName: string) {
    try {
      const restaurants = await Restaurant.find({restaurantName});
      return restaurants;
    } catch (error) {
      throw new Error(Constants.errorMsgs.invalidRestaurantName);
    }
  }

  async getRestaurantByCityName(City: string) {
    try {
      const restaurants = await Restaurant.find({ City });  
      return restaurants;
    } catch (error) {
      throw new Error(Constants.errorMsgs.invalidCityName);
    }
  }

  async getRestaurantsByCategoryName(categoryName) {
    try {
        const category:any = await Category.findOne({categoryName: categoryName});
        console.log(category)
        console.log(category.categoryName)
        const restaurants = await Restaurant.find({categoryId: category._id});
        return restaurants;
    } catch (error) {
        throw new Error(Constants.errorMsgs.fetchRestaurantsError);
    }
  }

}

export default new RestaurantService();
