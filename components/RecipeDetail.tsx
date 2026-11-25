import Link from "next/link";
import { ratingSummary, type Recipe } from "@/lib/recipes";
import RatingControl from "@/components/RatingControl";

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const { average, count } = ratingSummary(recipe.ratings);

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
            <span><strong>★</strong> {average?.toFixed(1) ?? "No ratings yet"} <small>({count} {count === 1 ? "rating" : "ratings"})</small></span>
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
      <RatingControl recipeId={recipe.id} />
      <div className="detail-footer"><span>Made with care by {recipe.author}.</span><Link className="text-button" href="/">Find another recipe <span aria-hidden="true">↗</span></Link></div>
    </article>
  );
}
