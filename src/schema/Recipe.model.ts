import mongoose, { Schema } from "mongoose";
import { Categories } from "../libs/enums/categories.enum";
import { CookTime, PrepTime } from "../libs/enums/recipe.enum";

// Nutrition Schema
const nutritionSchema = new Schema(
  {
    calories: { type: String, required: true },
    carbs: { type: String, required: true },
    protein: { type: String, required: true },
    fat: { type: String, required: true },
    sugar: { type: String, required: true },
  },
  { _id: false }
);

// Ingredient Schema
const ingredientSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { _id: false }
);

// Main Recipe Schema
const recipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },

    recipePrepTime: {
      type: Number,
      enum: PrepTime,
      default: PrepTime.ONE_FIVE,
      required: true,
    },

    recipeCookTime: {
      type: Number,
      enum: CookTime,
      default: CookTime.ONE_FIVE,
      required: true,
    },

    recipeType: {
      type: String,
      enum: Categories,
      required: true,
    },

    recipeImage: {
      type: String,
    },

    recipeNutrition: nutritionSchema,

    recipeIngredients: {
      mainDish: [ingredientSchema],
      sauce: [ingredientSchema],
    },

    recipeDirections: {
      type: [String],
      validate: {
        validator: function (val: string[]) {
          return val.length === 3;
        },
        message: "Directions must contain exactly 3 steps.",
      },
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  },
  { timestamps: true } 
);

export default mongoose.model("Recipe", recipeSchema);
