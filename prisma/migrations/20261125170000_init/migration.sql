CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cuisine" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ingredients" TEXT[] NOT NULL,
    "steps" TEXT[] NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Rating_value_check" CHECK ("value" >= 1 AND "value" <= 5)
);

CREATE INDEX "Recipe_cuisine_category_idx" ON "Recipe"("cuisine", "category");
CREATE INDEX "Recipe_createdAt_idx" ON "Recipe"("createdAt");
CREATE INDEX "Rating_recipeId_idx" ON "Rating"("recipeId");

ALTER TABLE "Rating" ADD CONSTRAINT "Rating_recipeId_fkey"
FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
