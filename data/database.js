const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const initDb = async () => {
    if (db) return db;

    try {
        const client = new MongoClient(process.env.MONGODB_URL);
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { initDb, getDb };