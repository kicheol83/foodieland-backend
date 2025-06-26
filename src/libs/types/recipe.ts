import { ObjectId } from "mongoose";
import { Categories } from "../enums/categories.enum";
import { CookTime, PrepTime } from "../enums/recipe.enum";

export interface Nutrition {
  calories: string;
  carbs: string;
  protein: string;
  fat: string;
  sugar?: string;
}

export interface Ingredient {
  title: string;
  items: string[];
}

export interface Recipe {
  _id: ObjectId;
  recipeName: string;
  recipePrepTime: PrepTime;
  recipeCookTime: CookTime;
  recipeType: Categories;
  recipeImage: string[];
  recipeNutrition: Nutrition;
  recipeIngredients: Ingredient[];
  recipeDirections: string[];
  recipeView?: number;
  recipeLike?: number;
  recipeVideo?: string;
  authorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeInput {
  recipeName: string;
  recipePrepTime: PrepTime;
  recipeCookTime: CookTime;
  recipeType: Categories;
  authorId: ObjectId;
  recipeImage: string[]; // Fayl yuklansa: req.files orqali
  recipeNutrition: {
    calories: string;
    carbs: string;
    protein: string;
    fat: string;
    sugar?: string;
  };
  recipeIngredients: {
    title: string;
    items: string[];
  }[];
  recipeDirections: string[];
  recipeView?: number;
  recipeLike?: number;
  recipeVideo?: string;
}
