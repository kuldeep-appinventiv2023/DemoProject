import Item from '../../models/itemModel'; 
import { Constants } from '../../constants';

class ItemService {
  async getAllItems() {
    try {
      const items = await Item.find();
      return items;
    } catch (error) {
      throw new Error(Constants.errorMsgs.ITEM_FETCH_ERROR);
    }
  }

  async getItemById(itemId: string) {
    try {
      const item = await Item.findById(itemId);
      if (!item) {
        throw new Error(Constants.errorMsgs.ITEM_NOT_FOUND);
      }
      return item;
    } catch (error) {
      throw new Error(Constants.errorMsgs.ITEM_GET_ERROR);
    }
  }
}

export default new ItemService();
