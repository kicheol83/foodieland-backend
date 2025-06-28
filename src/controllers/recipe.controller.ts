import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import RecipeServices from "../models/Recipe.service";
import { RecipeInput, RecipeUpdate } from "../libs/types/recipe";
import { Categories } from "../libs/enums/categories.enum";
import { shapeIntoMogooseObjectId } from "../libs/config";

const recipeService = new RecipeServices();

const recipeController: T = {};

recipeController.createNewRecipe = async (req: Request, res: Response) => {
  try {
    console.log("createNewProduct");

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
    const authorId = shapeIntoMogooseObjectId(req.cookies.authorId);

    if (!authorId) throw new Errors(HttpCode.BAD_REQUEST, Message.NO_AUTHOR_ID);

    await recipeService.createNewRecipe(authorId, data);

   

    res.render("users", { authorId, Categories });
  } catch (err) {
    console.log("Error, createNewProduct:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(`<script> alert ("${message}")</script>`);
  }
};

recipeController.getRecipeById = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;
    if (!authorId)
      throw new Errors(HttpCode.BAD_REQUEST, Message.IS_NOT_PARAMS_ID);

    console.log("getAuthorById for id:", authorId);

    const result = await recipeService.getRecipeById(authorId);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getAuthorById:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

recipeController.getAllRecipe = async (req: Request, res: Response) => {
  try {
    console.log("getAllRecipe");
    const authorId = req.body.authorId;
    const recipe = await recipeService.getAllRecipe();

    res.render("recipe", { recipe, Categories, authorId });
  } catch (err) {
    console.log("Error, getAllRecipe:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

recipeController.updateChosenRecipe = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenRecipe");
    console.log("req.body =>", req.body);
    const recipeId = req.params.id;
    const input: RecipeUpdate = req.body;
    if (req.file) input.recipeImage = [req.file.path.replace(/\\/, "/")];
    const result = await recipeService.updateChosenRecipe(recipeId, input);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateChosenRecipe:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

recipeController.deleteRecipe = async (req: Request, res: Response) => {
  try {
    console.log("deleteRecipe");
    const recipeId = req.params.id;
    await recipeService.deleteRecipe(recipeId);
    res.send("succesfull deleted");
  } catch (err) {
    console.log("Error, deleteRecipe:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default recipeController;
