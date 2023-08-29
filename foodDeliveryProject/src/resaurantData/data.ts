import fs from 'fs';
import csvParser from 'csv-parser';
import { MongoClient } from 'mongodb';

async function main() {
    const mongoClient = new MongoClient('mongodb://localhost:27017/');
    
    try {
        await mongoClient.connect();
        const db = mongoClient.db('foodDeliverySystem');
        const collection = db.collection('resturants');
        
        const csvFilePath = '/home/appinventiv/Downloads';
        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', async (row: any) => {
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
    } catch (err) {
        console.error('Error:', err);
    }
}
main();
