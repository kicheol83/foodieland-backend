import express from "express";
const routerAdmin = express.Router();
import shefController from "./controllers/shef.controller";
import makeUploader from "./libs/utils/uploader";
import recipeController from "./controllers/recipe.controller";

/* Shef */
routerAdmin.get("/", shefController.goHome);
routerAdmin
  .get("/login", shefController.getLogin)
  .post("/login", shefController.processLogin);
routerAdmin
  .get("/signup", shefController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    shefController.processSignup
  );

routerAdmin.get("/check-me", shefController.checkMe);
routerAdmin.get("/logout", shefController.logout);

/* Recipe */
routerAdmin.get("/product/all", recipeController.getAllProducts);
routerAdmin.post("/product/create", recipeController.createNewProduct);
routerAdmin.post("/product/:id", recipeController.updateChosenProduct);

/* User */
export default routerAdmin;
