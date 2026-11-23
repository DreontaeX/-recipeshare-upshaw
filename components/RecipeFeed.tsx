"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { averageRating, CATEGORIES, CUISINES, filterRecipes, loadRecipes, SEED_RECIPES, type Recipe } from "@/lib/recipes";

function Rating({ ratings }: { ratings: number[] }) {
  const average = averageRating(ratings)?.toFixed(1) ?? "—";
  return (
    <span className="rating" aria-label={`Average rating: ${average} out of 5`}>
      <span className="star" aria-hidden="true">★</span> {average}
      <span className="rating-count">{ratings.length ? ` (${ratings.length})` : " (no ratings)"}</span>
    </span>
  );
}

export default function RecipeFeed() {
  const [recipes, setRecipes] = useState<Recipe[]>(SEED_RECIPES);
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      setRecipes(loadRecipes());
    } catch {
      setStorageError("Your saved recipes could not be loaded from this browser.");
    }
  }, []);

  const visibleRecipes = useMemo(
    () => filterRecipes(recipes, cuisine, category),
    [recipes, cuisine, category],
  );

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A table for everyone</p>
          <h1>Good food is<br />better <em>shared.</em></h1>
          <p className="hero-description">Find something lovely to cook, or share the dish everyone asks you to make.</p>
          <Link className="button hero-button" href="/recipes/new">Share your recipe <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-art" role="img" aria-label="A table set with fresh food">
          <div className="hero-art-note"><span>from our kitchens,</span><strong>to yours.</strong></div>
          <span className="art-spark art-spark-one" aria-hidden="true">✳</span>
          <span className="art-spark art-spark-two" aria-hidden="true">✳</span>
        </div>
        <div className="hero-footnote"><span>01 — RECIPES TO MAKE YOU FEEL AT HOME</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="recipe-section" aria-labelledby="recipes-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A little inspiration</p>
            <h2 id="recipes-heading">Recipes from the community<span className="heading-period">.</span></h2>
          </div>
          <p className="section-aside">Made with care.<br />Shared with love.</p>
        </div>

        <div className="filters" aria-label="Filter recipes">
          <label className="filter-field">
            <span className="filter-label">Cuisine</span>
            <select value={cuisine} onChange={(event) => setCuisine(event.target.value)}>
              <option value="">All cuisines</option>
              {CUISINES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <span className="filter-divider" aria-hidden="true">+</span>
          <label className="filter-field">
            <span className="filter-label">Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">All categories</option>
              {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          {(cuisine || category) && <button className="clear-filters" onClick={() => { setCuisine(""); setCategory(""); }}>Clear filters <span aria-hidden="true">×</span></button>}
          <span className="results-count">{visibleRecipes.length} {visibleRecipes.length === 1 ? "recipe" : "recipes"}</span>
        </div>

        {storageError && <p className="notice" role="alert">{storageError}</p>}
        {visibleRecipes.length > 0 ? (
          <div className="recipe-grid">
            {visibleRecipes.map((recipe, index) => {
              return (
                <Link className="recipe-card" href={`/recipes/${recipe.id}`} key={recipe.id}>
                  <div className="card-image-wrap">
                    {/* Recipe images are user-provided URLs, so use a native image instead of a configured host allowlist. */}
                    <img className="card-image" src={recipe.imageUrl} alt={recipe.title} loading={index > 1 ? "lazy" : "eager"} />
                    <span className="card-category">{recipe.category}</span>
                    <span className="card-arrow" aria-hidden="true">↗</span>
                  </div>
                  <div className="card-content">
                    <div className="card-meta"><span>{recipe.cuisine}</span><span className="meta-dot">·</span><span>By {recipe.author}</span></div>
                    <h3>{recipe.title}</h3>
                    <div className="card-bottom"><span className="prep-time"><span aria-hidden="true">◷</span> {recipe.prepTime} min</span><Rating ratings={recipe.ratings} /></div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span className="empty-icon" aria-hidden="true">⌕</span>
            <h3>No recipes found</h3>
            <p>Try changing a filter to find something delicious.</p>
            <button className="text-button" onClick={() => { setCuisine(""); setCategory(""); }}>Clear all filters <span aria-hidden="true">↗</span></button>
          </div>
        )}
      </section>
    </>
  );
}
