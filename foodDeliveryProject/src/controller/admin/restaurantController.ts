import { Request, Response } from 'express';
import RestaurantService from '../../services/admin/restaurantServices';
import { Constants } from '../../constants';

class RestaurantController {
    async add(req: Request, res: Response) {
        const newRestaurantData = req.body;
        try {
            const newRestaurant = await RestaurantService.addRestaurant(newRestaurantData);
            res.status(201).json({ success: true, message: Constants.successMsgs.restaurantAdded, restaurant: newRestaurant });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.errorAddingRestaurant });
        }
    }

    async updateById(req: Request, res: Response) {
        const restaurantId = req.params.id;
        const updateData = req.body;

        try {
            const updatedRestaurant = await RestaurantService.updateRestaurantById(restaurantId, updateData);
            res.status(200).json({ success: true, message: Constants.successMsgs.restaurantUpdated, restaurant: updatedRestaurant });
        } catch (error) {
            console.log( error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.errorUpdatingRestaurant });
        }
    }

    async deleteById(req: Request, res: Response) {
        const restaurantId = req.params.id;

        try {
            await RestaurantService.deleteRestaurantById(restaurantId);
            res.status(200).json({ success: true, message: Constants.successMsgs.restaurantDeleted });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.errorDeletingRestaurant });
        }
    }
}

export default new RestaurantController();
