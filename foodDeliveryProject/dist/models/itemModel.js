"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const itemSchema = new mongoose_1.default.Schema({
    menuId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "menu",
        required: true,
    },
    name: { type: String, required: true },
    price: { type: mongoose_1.default.Types.Decimal128, required: true },
    image: { type: Buffer },
    isAvailable: { type: String },
});
const Item = mongoose_1.default.model("item", itemSchema);
console.log("Item model created...");
module.exports = Item;
exports.default = mongoose_1.default.model("item", itemSchema);
//# sourceMappingURL=itemModel.js.map