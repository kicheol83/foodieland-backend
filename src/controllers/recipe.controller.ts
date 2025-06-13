import { Request, Response } from "express";
import Errors from "../libs/Errors";
import { T } from "../libs/types/common";
import RecipeService from "../schema/Recipe.model";

const recipeService = new RecipeService();

const recipeController: T = {};
recipeController.getAllRecipe = async (req: Request, res: Response) => {
  try {
    console.log("getAllRecipe");
    res.render("products");
  } catch (err) {
    console.log("Error, getAllRecipe:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

recipeController.createNewRecipe = async (req: Request, res: Response) => {
  try {
    console.log("createNewRecipe");
  } catch (err) {
    console.log("Error, createNewRecipe:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

recipeController.updateChosenRecipe = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenRecipe");
  } catch (err) {
    console.log("Error, updateChosenRecipe:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default recipeController;
