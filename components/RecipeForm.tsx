"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CATEGORIES, CUISINES } from "@/lib/recipes";
import { validateRecipe, type RecipeErrors, type RecipeFormValues } from "@/lib/validation";

const initialValues: RecipeFormValues = {
  author: "",
  title: "",
  cuisine: "",
  category: "",
  ingredients: "",
  steps: "",
  prepTime: "",
  imageUrl: "",
};

export default function RecipeForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<RecipeErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(field: keyof RecipeFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRecipe(values);
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json() as { errors?: RecipeErrors; error?: string; id?: string };
      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        else setSubmitError(result.error ?? "Your recipe could not be saved. Please try again.");
        return;
      }
      if (!result.id) throw new Error("The recipe was saved, but the server did not return its identifier.");
      router.push("/");
      router.refresh();
    } catch {
      setSubmitError("Your recipe could not be saved. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function fieldError(field: keyof RecipeFormValues) {
    return errors[field] ? <span className="field-error" id={`${field}-error`}>{errors[field]}</span> : null;
  }

  return (
    <section className="form-page">
      <div className="form-intro">
        <Link className="back-link" href="/"><span aria-hidden="true">←</span> Back to recipes</Link>
        <p className="eyebrow"><span className="eyebrow-line" /> Pass it around</p>
        <h1>Every good recipe<br />has a <em>story.</em></h1>
        <p>Share the one you love. The dish you make without a recipe, the one that always brings people back for seconds.</p>
        <div className="form-quote"><span aria-hidden="true">“</span><span>The best ingredient is always<br />someone to share it with.</span></div>
      </div>
      <form className="recipe-form" onSubmit={handleSubmit} noValidate>
        <div className="form-heading">
          <span className="step-number">01</span>
          <div><h2>Your recipe</h2><p>All fields are required unless noted.</p></div>
        </div>
        {submitError && <p className="notice" role="alert">{submitError}</p>}

        <div className="form-row">
          <label className="form-field">
            <span>Author name</span>
            <input value={values.author} onChange={(event) => update("author", event.target.value)} aria-invalid={Boolean(errors.author)} aria-describedby={errors.author ? "author-error" : undefined} placeholder="What should we call you?" />
            {fieldError("author")}
          </label>
          <label className="form-field">
            <span>Recipe title</span>
            <input value={values.title} onChange={(event) => update("title", event.target.value)} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "title-error" : undefined} placeholder="Give it a lovely name" />
            {fieldError("title")}
          </label>
        </div>
        <div className="form-row">
          <label className="form-field">
            <span>Cuisine</span>
            <select value={values.cuisine} onChange={(event) => update("cuisine", event.target.value)} aria-invalid={Boolean(errors.cuisine)} aria-describedby={errors.cuisine ? "cuisine-error" : undefined}>
              <option value="">Choose a cuisine</option>
              {CUISINES.map((cuisine) => <option key={cuisine} value={cuisine}>{cuisine}</option>)}
            </select>
            {fieldError("cuisine")}
          </label>
          <label className="form-field">
            <span>Category</span>
            <select value={values.category} onChange={(event) => update("category", event.target.value)} aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? "category-error" : undefined}>
              <option value="">Choose a category</option>
              {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            {fieldError("category")}
          </label>
        </div>
        <label className="form-field">
          <span>Ingredients <small>one per line</small></span>
          <textarea rows={5} value={values.ingredients} onChange={(event) => update("ingredients", event.target.value)} aria-invalid={Boolean(errors.ingredients)} aria-describedby={errors.ingredients ? "ingredients-error" : undefined} placeholder={"2 cups of something lovely\nA pinch of sea salt\nFresh herbs, to finish"} />
          {fieldError("ingredients")}
        </label>
        <label className="form-field">
          <span>Steps <small>one step per line</small></span>
          <textarea rows={5} value={values.steps} onChange={(event) => update("steps", event.target.value)} aria-invalid={Boolean(errors.steps)} aria-describedby={errors.steps ? "steps-error" : undefined} placeholder={"Start by warming the pan...\nAdd everything and let it simmer...\nServe while it is still warm."} />
          {fieldError("steps")}
        </label>
        <div className="form-row">
          <label className="form-field">
            <span>Prep time <small>in minutes</small></span>
            <input type="number" min="1" step="1" value={values.prepTime} onChange={(event) => update("prepTime", event.target.value)} aria-invalid={Boolean(errors.prepTime)} aria-describedby={errors.prepTime ? "prepTime-error" : undefined} placeholder="30" />
            {fieldError("prepTime")}
          </label>
          <label className="form-field">
            <span>Image link <small>URL</small></span>
            <input type="url" value={values.imageUrl} onChange={(event) => update("imageUrl", event.target.value)} aria-invalid={Boolean(errors.imageUrl)} aria-describedby={errors.imageUrl ? "imageUrl-error" : undefined} placeholder="https://..." />
            {fieldError("imageUrl")}
          </label>
        </div>
        <div className="form-actions">
          <p>Your recipe will be shared with the whole community.</p>
          <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving…" : <>Share recipe <span aria-hidden="true">↗</span></>}</button>
        </div>
      </form>
    </section>
  );
}
