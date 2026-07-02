import mongoose from "mongoose";
import {env} from './env.js'

export async function connectDB(){
  try {
    await mongoose.connect(env.mongoUri, {
      autoIndex: env.nodeEnv !== 'production',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;

  }
}