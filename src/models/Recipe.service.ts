import RecipeModel from "../schema/Recipe.model";

class RecipeService {
  private readonly recipeModel;

  constructor() {
    this.recipeModel = RecipeModel;
  }
}

export default RecipeService;
