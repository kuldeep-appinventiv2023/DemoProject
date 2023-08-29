"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const menuSchema = new mongoose_1.default.Schema({
    categoryId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "categories", required: true
    },
    menuName: { type: String, required: true },
    image: { type: Buffer }
});
const Menu = mongoose_1.default.model("menu", menuSchema);
console.log("Menu model created...");
module.exports = Menu;
exports.default = mongoose_1.default.model("menu", menuSchema);
//# sourceMappingURL=menuModel.js.map