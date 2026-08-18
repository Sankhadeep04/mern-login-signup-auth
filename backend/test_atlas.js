import mongoose from 'mongoose';

const uri = 'mongodb+srv://halamadrid211207_db_user:amj5cPXINYyORUQ3@cluster0.nzkxhhn.mongodb.net/mern_auth_db?appName=Cluster0';

console.log('Connecting to MongoDB Atlas Cluster...');

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(conn => {
    console.log('✅ CONNECTED TO MONGODB ATLAS SUCCESSFULLY!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MONGODB ATLAS CONNECTION ERROR:', err.message);
    process.exit(1);
  });
