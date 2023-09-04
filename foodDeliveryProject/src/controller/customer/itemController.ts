import { Request, Response } from 'express';
import ItemService from '../../services/customer/itemServices';
import { Constants } from '../../constants';

class ItemController {
  async getAllItems(req: Request, res: Response) {
    try {
      const items = await ItemService.getAllItems();
      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: Constants.errorMsgs.ITEM_FETCH_ERROR });
    }
  };

  async getItemById(req: Request, res: Response){
    try {
      const itemId = req.params.itemId;
      const item = await ItemService.getItemById(itemId);
      return res.status(200).json(item);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: Constants.errorMsgs.ITEM_GET_ERROR });
    }
  };
}

export default new ItemController();