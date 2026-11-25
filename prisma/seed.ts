import { PrismaClient } from "@prisma/client";
import { SEED_RECIPES } from "../lib/recipes";

const prisma = new PrismaClient();

async function main() {
  for (const recipe of SEED_RECIPES) {
    const data = {
      author: recipe.author,
      title: recipe.title,
      cuisine: recipe.cuisine,
      category: recipe.category,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      prepTime: recipe.prepTime,
      imageUrl: recipe.imageUrl,
    };
    await prisma.recipe.upsert({
      where: { id: recipe.id },
      update: data,
      create: {
        id: recipe.id,
        ...data,
      },
    });

    for (const [index, value] of recipe.ratings.entries()) {
      const id = `${recipe.id}-rating-${index + 1}`;
      await prisma.rating.upsert({
        where: { id },
        update: { value },
        create: { id, recipeId: recipe.id, value },
      });
    }
  }

  console.log(`Seeded ${SEED_RECIPES.length} recipes.`);
}

main()
  .catch((error: unknown) => {
    console.error("Recipe seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
