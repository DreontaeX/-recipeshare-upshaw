import RecipeFeed from "@/components/RecipeFeed";
import { getRecipes } from "@/lib/recipe-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const recipes = await getRecipes();
  return <RecipeFeed initialRecipes={recipes} />;
}
