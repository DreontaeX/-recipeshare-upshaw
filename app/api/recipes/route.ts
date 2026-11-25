import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createRecipe, getRecipes } from "@/lib/recipe-store";
import { parseCategory, parseCuisine } from "@/lib/recipe-request";
import { CATEGORIES, CUISINES, type Category, type Cuisine } from "@/lib/recipes";
import { validateRecipe, type RecipeFormValues } from "@/lib/validation";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const cuisineValue = searchParams.get("cuisine");
  const categoryValue = searchParams.get("category");
  const cuisine = parseCuisine(cuisineValue);
  const category = parseCategory(categoryValue);

  if (cuisineValue && !cuisine) {
    return NextResponse.json({ error: `Cuisine must be one of: ${CUISINES.join(", ")}.` }, { status: 400 });
  }
  if (categoryValue && !category) {
    return NextResponse.json({ error: `Category must be one of: ${CATEGORIES.join(", ")}.` }, { status: 400 });
  }

  const recipes = await getRecipes(cuisine, category);
  return NextResponse.json(recipes);
}

function isRecipeFormValues(value: unknown): value is RecipeFormValues {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;
  return [
    "author",
    "title",
    "cuisine",
    "category",
    "ingredients",
    "steps",
    "prepTime",
    "imageUrl",
  ].every((field) => typeof body[field] === "string");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isRecipeFormValues(body)) {
    return NextResponse.json({ error: "Recipe fields must be submitted as text values." }, { status: 400 });
  }

  const errors = validateRecipe(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const recipe = await createRecipe({
    author: body.author.trim(),
    title: body.title.trim(),
    cuisine: body.cuisine as Cuisine,
    category: body.category as Category,
    ingredients: body.ingredients.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    steps: body.steps.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    prepTime: Number(body.prepTime),
    imageUrl: body.imageUrl.trim(),
  });

  revalidatePath("/");
  return NextResponse.json(recipe, { status: 201 });
}
