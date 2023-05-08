import { config } from "dotenv";
config();
import express from "express";
import { client } from "./configs/db.js";
import authRoute from "./routes/authRoute.js";
import inventoriesRoute from "./routes/inventoriesRoute.js";
import ordersRoute from "./routes/ordersRoute.js";

const app = express();
const PORT = process.env.PORT;

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    app.use(express.json());

    app.use("/api/v1/auth", authRoute)
    app.use("/api/v1/inventories", inventoriesRoute);
    app.use("/api/v1/orders", ordersRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }

};

main();