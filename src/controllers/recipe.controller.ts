import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import RecipeServices from "../models/Recipe.service";
import { RecipeInput } from "../libs/types/recipe";

const recipeService = new RecipeServices();

const recipeController: T = {};

recipeController.createNewRecipe = async (req: Request, res: Response) => {
  try {
    console.log("createNewProduct");
    console.log("reqbody =>", req.body);
    const file = req.file;
    if (!file) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const data: RecipeInput = req.body;
    data.recipeImage = [file.path.replace(/\\/g, "/")];
    if (typeof data.recipeIngredients === "string") {
      data.recipeIngredients = JSON.parse(data.recipeIngredients);
    }
    if (typeof data.recipeDirections === "string") {
      data.recipeDirections = JSON.parse(data.recipeDirections);
    }
    if (typeof data.recipeNutrition === "string") {
      data.recipeNutrition = JSON.parse(data.recipeNutrition);
    }

    await recipeService.createNewRecipe(data.authorId, data);

    res.send(`<script> alert ("Sucessful creation")</script>`);
  } catch (err) {
    console.log("Error, createNewProduct:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(`<script> alert ("${message}")</script>`);
  }
};



export default recipeController;
