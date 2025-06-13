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
routerAdmin.get(
  "/recipe/all",
  shefController.verifyAuth,
  recipeController.getAllRecipe
);
routerAdmin.post(
  "/recipe/create",
  shefController.verifyAuth,
  makeUploader("products").array("recipeImage", 5),
  recipeController.createNewRecipe
);
routerAdmin.post(
  "/recipe/:id",
  shefController.verifyAuth,
  recipeController.updateChosenRecipe
);

/* User */
export default routerAdmin;
