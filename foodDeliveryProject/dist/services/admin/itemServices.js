"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemModel_1 = __importDefault(require("../../models/itemModel"));
const constants_1 = require("../../constants");
class ItemService {
    async addItem(itemData) {
        try {
            const existingItem = await itemModel_1.default.findOne({ name: itemData.name });
            if (existingItem) {
                throw new Error();
            }
            const newItem = new itemModel_1.default(itemData);
            await newItem.save();
            return newItem;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.ITEM_ADD_ERROR);
        }
    }
    async updateItem(itemId, itemData) {
        try {
            const updatedItem = await itemModel_1.default.findByIdAndUpdate({ itemId }, { $set: { itemData } }, { new: true });
            if (!updatedItem) {
                throw new Error(constants_1.Constants.errorMsgs.ITEM_ADD_ERROR);
            }
            return updatedItem;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.ITEM_NOT_FOUND);
        }
    }
    async deleteItem(itemId) {
        try {
            const deletedItem = await itemModel_1.default.findByIdAndDelete(itemId);
            if (!deletedItem) {
                throw new Error(constants_1.Constants.errorMsgs.ITEM_NOT_FOUND);
            }
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.ITEM_DELETE_ERROR);
        }
    }
}
exports.default = new ItemService();
//# sourceMappingURL=itemServices.js.map