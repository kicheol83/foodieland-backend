import mongoose, { Schema } from "mongoose";
import { Categories } from "../libs/enums/categories.enum";
import { CookTime, PrepTime } from "../libs/enums/recipe.enum";

const nutritionSchema = new Schema({
  calories: { type: String, required: true },
  carbs: { type: String, required: true },
  protein: { type: String, required: true },
  fat: { type: String, required: true },
  sugar: { type: String, required: false },
});

const ingredientSchema = new Schema({
  title: { type: String, required: true },
  items: [{ type: String, required: true }],
});

const recipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },

    recipePrepTime: {
      type: Number,
      enum: PrepTime,
      required: true,
    },

    recipeCookTime: {
      type: Number,
      enum: CookTime,
      required: true,
    },

    recipeType: {
      type: String,
      enum: Categories,
      required: true,
    },

    recipeImage: {
      type: [String],
      default: [],
    },

    recipeNutrition: {
      type: [nutritionSchema],
      required: true,
    },

    recipeIngredients: {
      type: [ingredientSchema],
      required: true,
    },

    recipeDirections: [{ type: String, required: true }],

    recipeView: {
      type: Number,
      default: 0,
    },

    recipeLike: {
      type: Number,
      default: 0,
    },

    recipeVideo: {
      type: String,
      required: false,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  },
  { timestamps: true }
);

export const RecipeModel = mongoose.model("Recipe", recipeSchema);
