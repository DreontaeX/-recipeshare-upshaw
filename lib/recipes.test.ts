import { describe, expect, it } from "vitest";
import { averageRating, filterRecipes, SEED_RECIPES } from "./recipes";
import { isValidRating } from "./ratings";
import { validateRecipe, type RecipeFormValues } from "./validation";

describe("recipe filters", () => {
  it("provides at least three sample recipes across cuisines and categories", () => {
    expect(SEED_RECIPES.length).toBeGreaterThanOrEqual(3);
    expect(new Set(SEED_RECIPES.map((recipe) => recipe.cuisine)).size).toBeGreaterThan(1);
    expect(new Set(SEED_RECIPES.map((recipe) => recipe.category)).size).toBeGreaterThan(1);
  });

  it("combines cuisine and category and shows everything when both are clear", () => {
    expect(filterRecipes(SEED_RECIPES, "Iranian", "Main Dish").map((recipe) => recipe.id)).toEqual([
      "saffron-chicken",
    ]);
    expect(filterRecipes(SEED_RECIPES, "", "")).toHaveLength(SEED_RECIPES.length);
    expect(filterRecipes(SEED_RECIPES, "Iranian", "Dessert")).toEqual([]);
  });
});

describe("recipe validation", () => {
  const completeRecipe: RecipeFormValues = {
    author: "Niloofar",
    title: "Saffron rice",
    cuisine: "Iranian",
    category: "Main Dish",
    ingredients: "Rice\nSaffron",
    steps: "Cook the rice",
    prepTime: "30",
    imageUrl: "https://example.com/food.jpg",
  };

  it("reports each missing required field", () => {
    const errors = validateRecipe({ ...completeRecipe, author: "", title: "", imageUrl: "" });
    expect(errors).toMatchObject({
      author: "Author name is required.",
      title: "Recipe title is required.",
      imageUrl: "Image link is required.",
    });
  });

  it("accepts a complete recipe and rejects invalid links and prep times", () => {
    expect(validateRecipe(completeRecipe)).toEqual({});
    expect(
      validateRecipe({ ...completeRecipe, prepTime: "0", imageUrl: "not a link" }),
    ).toMatchObject({
      prepTime: "Enter a prep time greater than 0 minutes.",
      imageUrl: "Enter a valid image link.",
    });
  });

  describe("average rating", () => {
    it("calculates an average and returns no rating when there are no ratings", () => {
      expect(averageRating([5, 4, 3])).toBe(4);
      expect(averageRating([])).toBeNull();
    });
  });

  describe("rating validation", () => {
    it("accepts only whole-number ratings from one through five", () => {
      expect([1, 2, 3, 4, 5].every(isValidRating)).toBe(true);
      expect([0, 6, 2.5, "5", null].some(isValidRating)).toBe(false);
    });
  });
});
