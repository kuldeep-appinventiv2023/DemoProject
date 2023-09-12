import mongoose from 'mongoose';

export async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://localhost:27017/chatSystem', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }