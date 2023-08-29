"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const mongodb_1 = require("mongodb");
async function main() {
    const mongoClient = new mongodb_1.MongoClient('mongodb://localhost:27017/');
    try {
        await mongoClient.connect();
        const db = mongoClient.db('foodDeliverySystem');
        const collection = db.collection('resturants');
        const csvFilePath = '/home/appinventiv/Downloads';
        fs_1.default.createReadStream(csvFilePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', async (row) => {
            const dataToInsert = {
                field1: row.csv_field1,
                field2: row.csv_field2,
                // Add more fields as needed
            };
            await collection.insertOne(dataToInsert);
        })
            .on('end', () => {
            console.log('Data inserted successfully into MongoDB.');
            mongoClient.close();
        });
    }
    catch (err) {
        console.error('Error:', err);
    }
}
main();
//# sourceMappingURL=data.js.map