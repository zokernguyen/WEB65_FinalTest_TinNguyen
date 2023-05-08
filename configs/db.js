import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

export const client = new MongoClient(process.env.MONGO_DB_URL);

export const database = client.db("test_3");

export const inventories = database.collection("inventories");
export const order = database.collection("order");
export const users = database.collection("users");