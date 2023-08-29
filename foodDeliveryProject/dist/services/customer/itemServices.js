"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemModel_1 = __importDefault(require("../../models/itemModel"));
const constants_1 = require("../../constants");
class ItemService {
    async getAllItems() {
        try {
            const items = await itemModel_1.default.find();
            return items;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.ITEM_FETCH_ERROR);
        }
    }
    async getItemById(itemId) {
        try {
            const item = await itemModel_1.default.findById(itemId);
            if (!item) {
                throw new Error(constants_1.Constants.errorMsgs.ITEM_NOT_FOUND);
            }
            return item;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.ITEM_GET_ERROR);
        }
    }
}
exports.default = new ItemService();
//# sourceMappingURL=itemServices.js.map