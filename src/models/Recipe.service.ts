import { RecipeInput } from "../libs/types/recipe";
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
      const result = await this.recipeModel.create({...input, authorId});
      return result.toObject();
    } catch (err) {
      console.error("Erorr. model:createNewProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default RecipeServices;
