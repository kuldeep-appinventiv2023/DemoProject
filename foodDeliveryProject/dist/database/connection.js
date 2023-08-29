"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect('mongodb://localhost:27017/foodDeliverySystem', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database');
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=connection.js.map