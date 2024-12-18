import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Increase timeout
      connectTimeoutMS: 10000, // Increase connection timeout
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Detailed MongoDB Connection Error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    throw error;
  }
}