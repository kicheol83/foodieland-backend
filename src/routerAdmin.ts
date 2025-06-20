import express from "express";
const routerAdmin = express.Router();
import shefController from "./controllers/shef.controller";
import makeUploader from "./libs/utils/uploader";
import recipeController from "./controllers/recipe.controller";
import authorController from "./controllers/author.controller";

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

/** Author **/

routerAdmin.post(
  "/author/create",
  shefController.verifyAuth,
  makeUploader("authors").single("authorImage"),
  authorController.createAuthor
);

routerAdmin.get(
  "/author/all",
  shefController.verifyAuth,
  authorController.getAllAuthors
);

routerAdmin.get(
  "/author/param/:id",
  shefController.verifyAuth,
  authorController.getAuthorById
);



routerAdmin.post(
  "/author/update/:id",
  shefController.verifyAuth,
  makeUploader("authors").single("authorImage"),
  authorController.updateAuthor
);

routerAdmin.post(
  "/author/delete/:id",
  shefController.verifyAuth,
  authorController.deleteAuthor
);

/* Recipe */
routerAdmin.get(
  "/recipe/all",
  shefController.verifyAuth,
  recipeController.getAllRecipe
);

routerAdmin.get(
  "/recipe/by/:id",
  shefController.verifyAuth,
  recipeController.getRecipeById
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
