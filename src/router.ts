// src/routerAdmin.ts
import express from "express";
const router = express.Router();

import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import recipeController from "./controllers/recipe.controller";
import { verifyAuth } from "./config/googleVerifAuth";

router.post("/member/login", memberController.login);
router.post(
  "/member/signup",
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

/** AUTHOR **/
router.get(
  "/author/all",
  memberController.verifyAuth,
  memberController.getAuthors
);
router.get(
  "/author/:id",
  memberController.verifyAuth,
  memberController.getAuthor
);

/** GOOGLE AUTHR ROUTER **/
router.get("/member/me", verifyAuth, memberController.getMe);

export default router;
