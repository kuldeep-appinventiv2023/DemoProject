import Item from '../../models/itemModel'; 
import { Constants } from '../../constants';

class ItemService {
  async addItem(itemData: any) {
    try {
      const existingItem = await Item.findOne({ name: itemData.name });
      if (existingItem) {
        throw new Error();
      }

      const newItem = new Item(itemData);
      await newItem.save();

      return newItem;
    } catch (error) {
      throw new Error(Constants.errorMsgs.ITEM_ADD_ERROR);
    }
  }

  async updateItem(itemId: string, itemData: any) {
    try {
      const updatedItem = await Item.findByIdAndUpdate({itemId}, { $set : { itemData }}, { new: true });
      if (!updatedItem) {
        throw new Error(Constants.errorMsgs.ITEM_ADD_ERROR);
      }
      return updatedItem;
    } catch (error) {
      throw new Error(Constants.errorMsgs.ITEM_NOT_FOUND);
    }
  }

  async deleteItem(itemId: string) {
    try {
      const deletedItem = await Item.findByIdAndDelete(itemId);
      if (!deletedItem) {
        throw new Error(Constants.errorMsgs.ITEM_NOT_FOUND);
      }
    } catch (error) {
      throw new Error(Constants.errorMsgs.ITEM_DELETE_ERROR);
    }
  }
}

export default new ItemService();
