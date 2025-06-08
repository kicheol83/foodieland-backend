import express from "express";
const routerAdmin = express.Router();
import shefController from "./controllers/shef.controller";
import makeUploader from "./libs/utils/uploader";

/* Restaurant */
routerAdmin.get("/", shefController.goHome);
routerAdmin
  .get("/login", shefController.getLogin)
  .post("/login", shefController.processLogin);
routerAdmin
  .get(
    "/signup",

    shefController.getSignup
  )
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    shefController.processSignup
  );

routerAdmin.get("/check-me", shefController.checkMe);
routerAdmin.get("/logout", shefController.logout);

/* Product */
/* User */
export default routerAdmin;
