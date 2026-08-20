import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_auth_db';
  
  try {
    // 10 seconds timeout to allow cloud MongoDB Atlas DNS and TLS handshake to complete
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`[MongoDB] ✅ Connected to DATABASE: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB] ⚠️ Direct connection to ${uri} failed: ${error.message}`);
    console.log(`[MongoDB] 🔄 Falling back to auto-managed In-Memory MongoDB instance...`);
    
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      const memoryConn = await mongoose.connect(memoryUri);
      console.log(`[MongoDB] ⚠️ Connected to IN-MEMORY Database (Temporary): ${memoryConn.connection.host}`);
    } catch (memErr) {
      console.error(`[MongoDB] Error initializing In-Memory MongoDB:`, memErr.message);
      process.exit(1);
    }
  }
};

export default connectDB;
