import RecipeDetail from "@/components/RecipeDetail";
import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/recipe-store";

export const dynamic = "force-dynamic";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);
  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} />;
}
