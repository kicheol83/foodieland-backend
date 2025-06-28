import { ObjectId } from "mongoose";
import { shapeIntoMogooseObjectId } from "../libs/config";
import LikeModel from "../schema/Like.model";
import { RecipeModel } from "../schema/Recipe.model";
import { LikeGroup } from "../libs/enums/like.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

class LikeService {
  private readonly recipeModel;
  private readonly likeModel;

  constructor() {
    this.recipeModel = RecipeModel;
    this.likeModel = LikeModel;
  }

  public async likeTargetRecipe(memberId: ObjectId, recipeId: string) {
    try {
      console.log("likeTargetRecipe");
      const likeRefId = shapeIntoMogooseObjectId(recipeId);

      const recipe = await this.recipeModel
        .findOne({
          _id: likeRefId,
        })
        .exec();
      if (!recipe) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

      const modifier = await this.toggleLike({
        memberId,
        likeRefId,
        likeGroup: LikeGroup.RECIPE,
      });

      const updated = await this.recipeModel
        .findByIdAndUpdate(
          likeRefId,
          { $inc: { recipeLike: modifier } },
          { new: true }
        )
        .exec();

      if (!updated) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

      return updated;
    } catch (err) {
      console.error("Erorr. likeTargetRecipe", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
    }
  }

  public async toggleLike(input: {
    memberId: ObjectId;
    likeRefId: ObjectId;
    likeGroup: LikeGroup.RECIPE;
  }): Promise<number> {
    try {
      console.log("toggleLike");

      const search = {
        memberId: input.memberId,
        likeRefId: input.likeRefId,
      };

      const exist = await this.likeModel.findOne(search).exec();
      let modifier = 1;

      if (exist) {
        await this.likeModel.findOneAndDelete(search).exec();
        modifier = -1;
      } else {
        await this.likeModel.create(input);
      }

      return modifier;
    } catch (err) {
      console.error("Erorr. toggleLike", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default LikeService;
