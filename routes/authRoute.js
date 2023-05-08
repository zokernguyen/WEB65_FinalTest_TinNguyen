import express from "express";
import authRouteController from "../controllers/authRouteController.js";

const authRoute = express.Router();

//Login
authRoute.post("/login", authRouteController.login);

export default authRoute;