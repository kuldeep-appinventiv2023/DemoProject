"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemServices_1 = __importDefault(require("../../services/admin/itemServices"));
const constants_1 = require("../../constants");
class ItemController {
    async addItem(req, res) {
        try {
            const itemData = req.body;
            const newItem = await itemServices_1.default.addItem(itemData);
            return res.status(201).json({ message: constants_1.Constants.successMsgs.ITEM_ADDED_SUCCESS, item: newItem });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ITEM_ADD_ERROR });
        }
    }
    ;
    async updateItem(req, res) {
        try {
            const itemId = req.params.itemId;
            const itemData = req.body;
            const updatedItem = await itemServices_1.default.updateItem(itemId, itemData);
            return res.status(200).json({ message: constants_1.Constants.successMsgs.ITEM_UPDATED_SUCCESS, item: updatedItem });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ITEM_UPDATE_ERROR });
        }
    }
    ;
    async deleteItem(req, res) {
        try {
            const itemId = req.params.itemId;
            await itemServices_1.default.deleteItem(itemId);
            return res.status(200).json({ message: constants_1.Constants.successMsgs.ITEM_DELETED_SUCCESS });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ITEM_DELETE_ERROR });
        }
    }
    ;
}
exports.default = new ItemController();
//# sourceMappingURL=itemController.js.map