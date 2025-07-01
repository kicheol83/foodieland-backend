import { RecipeInput, RecipeInquiry, RecipeUpdate } from "../libs/types/recipe";
import Errors, { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import { RecipeModel } from "../schema/Recipe.model";
import { Recipe } from "../libs/types/recipe";
import { ObjectId } from "mongoose";
import { lookupMember, shapeIntoMogooseObjectId } from "../libs/config";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";
import ViewService from "./Views.service";
import { T } from "../libs/types/common";

class RecipeServices {
  private readonly recipeModel;
  public viewService;

  constructor() {
    this.recipeModel = RecipeModel;
    this.viewService = new ViewService();
  }

  /** SPA **/
  public async getRecipes(inquiry: RecipeInquiry): Promise<Recipe[]> {
    const match: T = {};

    if (inquiry.recipeType) {
      match.recipeType = inquiry.recipeType;
    }
    if (inquiry.search) {
      match.recipeName = { $regex: new RegExp(inquiry.search, "i") };
    }

    const sort: T =
      inquiry.recipe === "authorId"
        ? { [inquiry.recipe]: 1 }
        : { [inquiry.recipe]: -1 };

    const result = await this.recipeModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 },
        lookupMember,
        { $unwind: "$authorData" },
      ])
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async getRecipe(
    memberId: ObjectId | null,
    id: string
  ): Promise<Recipe> {
    const recipeId = shapeIntoMogooseObjectId(id);

    let result = await this.recipeModel
      .findOne({
        _id: recipeId,
      })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    if (memberId) {
      // Check Existence
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: recipeId,
        viewGroup: ViewGroup.RECIPE,
      };
      const existView = await this.viewService.checkViewExistence(input);

      console.log("existView:", !!existView);
      if (!existView) {
        // Insert View
        await this.viewService.insertMemberView(input);

        // Incrase View
        result = await this.recipeModel
          .findByIdAndUpdate(
            recipeId,
            { $inc: { recipeView: 1 } },
            { new: true }
          )
          .exec();
      }
    }
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result.toObject();
  }

  /** BSSR **/
  public async createNewRecipe(
    author: ObjectId,
    input: RecipeInput
  ): Promise<Recipe> {
    try {
      const authorId = shapeIntoMogooseObjectId(author);
      const result = await this.recipeModel.create({ ...input, authorId });
      return result.toObject();
    } catch (err) {
      console.error("Erorr. model:createNewProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async getAllRecipe(): Promise<Recipe[]> {
    const result = await this.recipeModel.find().exec();
    if (!result || result.length === 0) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    }

    const recipe: Recipe[] = result.map((doc: any) => doc.toObject());

    return recipe;
  }

  public async getRecipeById(
    memberId: ObjectId | null,
    id: string
  ): Promise<Recipe> {
    const recipeId = shapeIntoMogooseObjectId(id);

    let result = await this.recipeModel
      .findOne({
        _id: recipeId,
      })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    if (memberId) {
      // Check Existence
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: recipeId,
        viewGroup: ViewGroup.RECIPE,
      };
      const existView = await this.viewService.checkViewExistence(input);

      console.log("existView:", !!existView);
      if (!existView) {
        // Insert View
        await this.viewService.insertMemberView(input);

        // Incrase View
        result = await this.recipeModel
          .findByIdAndUpdate(
            recipeId,
            { $inc: { recipeView: 1 } },
            { new: true }
          )
          .exec();
      }
    }
    return result?.toObject() as Recipe;
  }

  public async updateChosenRecipe(
    id: string,
    input: RecipeUpdate
  ): Promise<Recipe> {
    id = shapeIntoMogooseObjectId(id);
    const result = await this.recipeModel
      .findOneAndUpdate({ _id: id }, input, { new: true, runValidators: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result.toObject();
  }

  public async deleteRecipe(id: string) {
    const result = await this.recipeModel.findByIdAndDelete(id);
    if (!result)
      throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG);
    return result;
  }
}

export default RecipeServices;
