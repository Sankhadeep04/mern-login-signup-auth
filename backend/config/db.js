import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_auth_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });
    isConnected = true;
    console.log(`[MongoDB] ✅ Connected to DATABASE: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB] ⚠️ Direct connection failed: ${error.message}`);
    
    // Only attempt MongoMemoryServer in local development environment
    if (!process.env.VERCEL) {
      try {
        console.log(`[MongoDB] 🔄 Initializing In-Memory MongoDB instance...`);
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongoMemoryServer = await MongoMemoryServer.create();
        const memoryUri = mongoMemoryServer.getUri();
        await mongoose.connect(memoryUri);
        isConnected = true;
        console.log(`[MongoDB] ⚠️ Connected to IN-MEMORY Database (Temporary)`);
        return;
      } catch (memErr) {
        console.error(`[MongoDB] Error initializing In-Memory MongoDB:`, memErr.message);
      }
    }
    throw error;
  }
};

export default connectDB;
