import express from "express";
const routerAdmin = express.Router();
import shefController from "./controllers/shef.controller";

/* Restaurant */
routerAdmin.get("/", shefController.goHome);
routerAdmin
  .get("/login", shefController.getLogin)
  .post("/login", shefController.processLogin);
routerAdmin
  .get("/signup", shefController.getSignup)
  .post("/signup", shefController.processSignup);

/* Product */
/* User */
export default routerAdmin;
