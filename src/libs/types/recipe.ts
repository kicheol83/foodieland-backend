import { ObjectId } from "mongoose";
import { CookTime, PrepTime } from "../enums/recipe.enum";
import { Categories } from "../enums/categories.enum";

export interface Recipe {
  _id: ObjectId;
  recipeName: string;
  recipePrepTime: PrepTime;
  recipeCookTime: CookTime;
  recipeType: Categories;
  recipeImage: string[];
  recipeNutrition: string[];
  recipeIngredients: string[];
  recipeDirections: string[];
  authorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
