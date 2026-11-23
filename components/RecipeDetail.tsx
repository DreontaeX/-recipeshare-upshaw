"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { averageRating, loadRecipes, SEED_RECIPES, type Recipe } from "@/lib/recipes";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>(SEED_RECIPES);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    try {
      setRecipes(loadRecipes());
    } catch {
      setLoadError("Saved recipes could not be loaded from this browser.");
    } finally {
      setLoaded(true);
    }
  }, []);

  const recipe = recipes.find((item) => item.id === id);
  if (loadError) return <section className="detail-state"><p className="notice" role="alert">{loadError}</p><Link className="back-link" href="/">← Back to recipes</Link></section>;
  if (!loaded) return <section className="detail-state" aria-live="polite">Loading recipe…</section>;
  if (!recipe) {
    return (
      <section className="detail-state">
        <span className="empty-icon" aria-hidden="true">⌕</span>
        <h1>Recipe not found</h1>
        <p>It may have moved, but there are plenty more to discover.</p>
        <Link className="button" href="/">Explore recipes <span aria-hidden="true">↗</span></Link>
      </section>
    );
  }

  const average = averageRating(recipe.ratings)?.toFixed(1) ?? "No ratings yet";

  return (
    <article className="detail-page">
      <Link className="back-link" href="/"><span aria-hidden="true">←</span> All recipes</Link>
      <div className="detail-hero">
        <div className="detail-image-wrap">
          {/* User-provided image URLs are not restricted to a configured image host. */}
          <img src={recipe.imageUrl} alt={recipe.title} />
          <span className="detail-image-label">{recipe.cuisine} kitchen</span>
        </div>
        <div className="detail-heading">
          <p className="eyebrow"><span className="eyebrow-line" /> {recipe.category}</p>
          <h1>{recipe.title}<span className="heading-period">.</span></h1>
          <p className="detail-byline">A recipe by <strong>{recipe.author}</strong></p>
          <div className="detail-stats">
            <span><strong>◷</strong> {recipe.prepTime} min</span>
            <span><strong>★</strong> {average}{recipe.ratings.length > 0 && <small> ({recipe.ratings.length} ratings)</small>}</span>
          </div>
        </div>
      </div>
      <div className="recipe-instructions">
        <section className="ingredients-panel">
          <p className="eyebrow">Gather around</p>
          <h2>Ingredients<span className="heading-period">.</span></h2>
          <ul>{recipe.ingredients.map((ingredient, index) => <li key={`${ingredient}-${index}`}><span className="ingredient-check" aria-hidden="true">✓</span>{ingredient}</li>)}</ul>
        </section>
        <section className="steps-panel">
          <p className="eyebrow">Here’s how</p>
          <h2>Make it<span className="heading-period">.</span></h2>
          <ol>{recipe.steps.map((step, index) => <li key={`${step}-${index}`}><span className="instruction-number">{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
        </section>
      </div>
      <div className="detail-footer"><span>Made with care by {recipe.author}.</span><Link className="text-button" href="/">Find another recipe <span aria-hidden="true">↗</span></Link></div>
    </article>
  );
}
