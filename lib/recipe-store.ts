import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Category, Cuisine, Recipe } from "@/lib/recipes";

const recipeWithRatings = Prisma.validator<Prisma.RecipeDefaultArgs>()({
  include: { ratings: { select: { value: true } } },
});

type RecipeRecord = Prisma.RecipeGetPayload<typeof recipeWithRatings>;

function toRecipe(record: RecipeRecord): Recipe {
  return {
    id: record.id,
    author: record.author,
    title: record.title,
    cuisine: record.cuisine as Cuisine,
    category: record.category as Category,
    ingredients: record.ingredients,
    steps: record.steps,
    prepTime: record.prepTime,
    imageUrl: record.imageUrl,
    ratings: record.ratings.map((rating) => rating.value),
  };
}

export async function getRecipes(cuisine?: Cuisine, category?: Category): Promise<Recipe[]> {
  const records = await prisma.recipe.findMany({
    where: {
      ...(cuisine ? { cuisine } : {}),
      ...(category ? { category } : {}),
    },
    include: recipeWithRatings.include,
    orderBy: { createdAt: "desc" },
  });
  return records.map(toRecipe);
}

export async function getRecipe(id: string): Promise<Recipe | null> {
  const record = await prisma.recipe.findUnique({
    where: { id },
    include: recipeWithRatings.include,
  });
  return record ? toRecipe(record) : null;
}

export async function createRecipe(
  recipe: Omit<Recipe, "id" | "ratings">,
): Promise<Recipe> {
  const record = await prisma.recipe.create({
    data: recipe,
    include: recipeWithRatings.include,
  });
  return toRecipe(record);
}

export async function createRating(recipeId: string, value: number): Promise<Recipe | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    select: { id: true },
  });
  if (!recipe) return null;

  await prisma.rating.create({
    data: { recipeId, value },
  });
  return getRecipe(recipeId);
}
