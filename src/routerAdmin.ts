import express from "express";
const routerAdmin = express.Router();
import shefController from "./controllers/shef.controller";

routerAdmin.get("/", shefController.goHome);

routerAdmin.get("/login", shefController.getLogin);

routerAdmin.get("/signup", shefController.getSignup);

export default routerAdmin;
