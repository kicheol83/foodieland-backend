import { ObjectId, Types } from "mongoose";
import { Categories } from "../enums/categories.enum";
import { CookTime, PrepTime } from "../enums/recipe.enum";
import { Author } from "./author";

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
  _id: Types.ObjectId;
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
  authorId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  /** from aggreation **/
  authorData?: Author[];
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

export interface RecipeUpdate {
  recipeName?: string;
  recipePrepTime?: PrepTime;
  recipeCookTime?: CookTime;
  recipeType?: Categories;
  recipeImage?: string[]; // Fayl yuklansa: req.files orqali
  recipeNutrition?: {
    calories?: string;
    carbs?: string;
    protein?: string;
    fat?: string;
    sugar?: string;
  };
  recipeIngredients?: {
    title?: string;
    items?: string[];
  }[];
  recipeDirections?: string[];
  recipeVideo?: string;
}

export interface RecipeInquiry {
  recipe: string;
  page: number;
  limit: number;
  recipeType?: Categories;
  search?: string;
}
