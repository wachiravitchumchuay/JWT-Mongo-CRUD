import { MongoClient, Db } from "mongodb";
import "dotenv/config";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "testdb";

let db: Db;
const client = new MongoClient(mongoUrl);

export async function connectDB(): Promise < void> {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to Database");
    } catch(error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export function getDb ():Db  {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB first.");
    }
    return db;
};

