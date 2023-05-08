import express from "express";
import inventoriesRouteController from "../controllers/inventoriesRouteController.js";
import authMDWController from "../controllers/authMDWController.js";

const inventoriesRoute = express.Router();

// Get inventories
inventoriesRoute.get("/", authMDWController.verifyToken, inventoriesRouteController.getInventories);

export default inventoriesRoute;
