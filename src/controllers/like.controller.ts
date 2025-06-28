import { Response } from "express";
import LikeService from "../models/Like.service";
import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import Errors, { HttpCode } from "../libs/Errors";
const likeService = new LikeService();

const likeController: T = {};

likeController.toggleRecipeLike = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    console.log("toggleRecipeLike");
    const memberId = req.member._id; // Auth middleware orqali
    const recipeId = req.params.id;

    const updatedRecipe = await likeService.likeTargetRecipe(
      memberId,
      recipeId
    );
    if (!updatedRecipe) throw new Error("Update failed");

    res.status(HttpCode.OK).json({
      success: true,
      message: "Like toggled",
      data: updatedRecipe,
    });
  } catch (err) {
    console.error("Like error", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default likeController;
