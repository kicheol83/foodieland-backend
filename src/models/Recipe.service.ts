import { RecipeInput, RecipeUpdate } from "../libs/types/recipe";
import Errors, { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import { RecipeModel } from "../schema/Recipe.model";
import { Recipe } from "../libs/types/recipe";
import { ObjectId } from "mongoose";
import { shapeIntoMogooseObjectId } from "../libs/config";

class RecipeServices {
  private readonly recipeModel;

  constructor() {
    this.recipeModel = RecipeModel;
  }

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

  public async getRecipeById(recipeId: string): Promise<Recipe> {
    const recipe = shapeIntoMogooseObjectId(recipeId);
    const result = await this.recipeModel.findById(recipe).exec();
    if (!result)
      throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG);
    return result.toObject();
  }

  public async getAllRecipe(): Promise<Recipe[]> {
    const result = await this.recipeModel.find().exec();
    if (!result || result.length === 0) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    }

    const recipe: Recipe[] = result.map((doc: any) => doc.toObject());

    return recipe;
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
