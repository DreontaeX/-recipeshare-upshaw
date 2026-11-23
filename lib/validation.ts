import { CATEGORIES, CUISINES, type Category, type Cuisine } from "./recipes";

export interface RecipeFormValues {
  author: string;
  title: string;
  cuisine: string;
  category: string;
  ingredients: string;
  steps: string;
  prepTime: string;
  imageUrl: string;
}

export type RecipeField = keyof RecipeFormValues;
export type RecipeErrors = Partial<Record<RecipeField, string>>;

export function validateRecipe(values: RecipeFormValues): RecipeErrors {
  const labels: Record<RecipeField, string> = {
    author: "Author name",
    title: "Recipe title",
    cuisine: "Cuisine",
    category: "Category",
    ingredients: "Ingredients",
    steps: "Steps",
    prepTime: "Prep time",
    imageUrl: "Image link",
  };
  const errors: RecipeErrors = {};

  for (const field of Object.keys(labels) as RecipeField[]) {
    if (!values[field].trim()) {
      errors[field] = `${labels[field]} is required.`;
    }
  }

  if (values.cuisine && !CUISINES.includes(values.cuisine as Cuisine)) {
    errors.cuisine = "Choose a cuisine from the list.";
  }
  if (values.category && !CATEGORIES.includes(values.category as Category)) {
    errors.category = "Choose a category from the list.";
  }
  if (
    values.prepTime.trim() &&
    (!Number.isInteger(Number(values.prepTime)) || Number(values.prepTime) <= 0)
  ) {
    errors.prepTime = "Enter a prep time greater than 0 minutes.";
  }
  if (values.imageUrl.trim()) {
    try {
      const url = new URL(values.imageUrl);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.imageUrl = "Enter an image link that starts with http:// or https://.";
      }
    } catch {
      errors.imageUrl = "Enter a valid image link.";
    }
  }

  return errors;
}
