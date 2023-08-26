import Restaurant from '../../models/restaurantModel';
import { Constants } from '../../constants';

class RestaurantService {
    async addRestaurant(newRestaurantData: any) {
        const newRestaurant = new Restaurant(newRestaurantData);
        await newRestaurant.save();
        return newRestaurant;
    }

    async updateRestaurantById(restaurantId: any, updateData: any) {
        try {
            const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, updateData, { new: true });
            return updatedRestaurant;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRestaurantById(restaurantId: string) {
        try {
            const deletedRestaurant = await Restaurant.findByIdAndRemove(restaurantId);
            if (!deletedRestaurant) {
                throw new Error(Constants.errorMsgs.restaurantNotFound);
            }
        } catch (error) {
            throw new Error(Constants.errorMsgs.errorDeletingRestaurant);
        }
    }
}

export default new RestaurantService();
