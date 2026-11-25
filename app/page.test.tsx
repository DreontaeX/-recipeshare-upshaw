import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import RecipeFeed from "@/components/RecipeFeed";
import { SEED_RECIPES } from "@/lib/recipes";

describe("home page smoke test", () => {
  it("renders the RecipeShare home page and sample recipe cards", () => {
    const markup = renderToStaticMarkup(<RecipeFeed initialRecipes={SEED_RECIPES} />);

    expect(markup).toContain("Recipes from the community");
    expect(markup).toContain("Saffron Chicken &amp; Jeweled Rice");
    expect(markup).toContain("Sunday Tomato &amp; Basil Pasta");
  });
});
