// src/routerAdmin.ts
import express from "express";
const router = express.Router();

import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";

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

export default router;
