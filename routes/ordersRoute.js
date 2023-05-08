import express from "express";
import ordersRouteController from "../controllers/ordersRouteController.js";
import authMDWController from "../controllers/authMDWController.js";

const ordersRoute = express.Router();

// Get orders with product description
ordersRoute.get("/", authMDWController.verifyToken, ordersRouteController.getOrders);

export default ordersRoute;
