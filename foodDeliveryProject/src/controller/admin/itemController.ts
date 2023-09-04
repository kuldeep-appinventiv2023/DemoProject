import { Request, Response } from 'express';
import ItemService from '../../services/admin/itemServices';
import { Constants } from '../../constants';

class ItemController {
  async addItem(req: Request, res: Response){
    try {
      const itemData = req.body;
      const newItem = await ItemService.addItem(itemData);
      return res.status(201).json({ message: Constants.successMsgs.ITEM_ADDED_SUCCESS, item: newItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: Constants.errorMsgs.ITEM_ADD_ERROR });
    }
  };

  async updateItem(req: Request, res: Response) {
    try {
      const itemId = req.params.itemId;
      const itemData = req.body;
      const updatedItem = await ItemService.updateItem(itemId, itemData);
      return res.status(200).json({ message: Constants.successMsgs.ITEM_UPDATED_SUCCESS , item: updatedItem });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: Constants.errorMsgs.ITEM_UPDATE_ERROR });
    }
  };

  async deleteItem(req: Request, res: Response) {
    try {
      const itemId = req.params.itemId;
      await ItemService.deleteItem(itemId);
      return res.status(200).json({ message: Constants.successMsgs.ITEM_DELETED_SUCCESS });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: Constants.errorMsgs.ITEM_DELETE_ERROR });
    }
  };
}

export default new ItemController();