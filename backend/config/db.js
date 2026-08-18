import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_auth_db';
  
  try {
    // Set a fast connection timeout to test if local MongoDB is available
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB] Direct connection to ${uri} failed (${error.message}).`);
    console.log(`[MongoDB] Initializing auto-managed In-Memory MongoDB instance...`);
    
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      const memoryConn = await mongoose.connect(memoryUri);
      console.log(`[MongoDB] Connected successfully to In-Memory Database: ${memoryConn.connection.host}`);
    } catch (memErr) {
      console.error(`[MongoDB] Error initializing In-Memory MongoDB:`, memErr.message);
      process.exit(1);
    }
  }
};

export default connectDB;
