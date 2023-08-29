"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemServices_1 = __importDefault(require("../../services/customer/itemServices"));
const constants_1 = require("../../constants");
class ItemController {
    async getAllItems(req, res) {
        try {
            const items = await itemServices_1.default.getAllItems();
            return res.status(200).json(items);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ITEM_FETCH_ERROR });
        }
    }
    ;
    async getItemById(req, res) {
        try {
            const itemId = req.params.itemId;
            const item = await itemServices_1.default.getItemById(itemId);
            return res.status(200).json(item);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ITEM_GET_ERROR });
        }
    }
    ;
}
exports.default = new ItemController();
//# sourceMappingURL=itemController.js.map