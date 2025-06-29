// src/routerAdmin.ts
import express from "express";
const router = express.Router();

import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import recipeController from "./controllers/recipe.controller";

router.post("/login", memberController.login);
router.post(
  "/signup",
  uploader("members").single("memberImage"),
  memberController.signup
);

router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);

router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);
router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
);

/** RECIPE **/
router.get("/recipes/all", recipeController.getRecipes);
router.get(
  "/recipe/:id",
  memberController.retrieveAuth,
  recipeController.getRecipe
);

export default router;
