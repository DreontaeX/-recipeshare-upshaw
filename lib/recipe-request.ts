import { CATEGORIES, CUISINES, type Category, type Cuisine } from "@/lib/recipes";

export function parseCuisine(value: string | null): Cuisine | undefined {
  if (!value) return undefined;
  return CUISINES.find((cuisine) => cuisine === value);
}

export function parseCategory(value: string | null): Category | undefined {
  if (!value) return undefined;
  return CATEGORIES.find((category) => category === value);
}
