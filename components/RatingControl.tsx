"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RatingControl({ recipeId }: { recipeId: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submitRating() {
    if (selected < 1 || selected > 5 || isSaving) return;

    setIsSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/recipes/${encodeURIComponent(recipeId)}/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: selected }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "Your rating could not be saved. Please try again.");
        return;
      }

      setMessage("Thanks! Your rating was saved.");
      setSelected(0);
      router.refresh();
    } catch {
      setError("Your rating could not be saved. Check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rating-control">
      <p className="eyebrow">Cooked this?</p>
      <h2>Leave a little love<span className="heading-period">.</span></h2>
      <div className="rating-actions">
        <div className="star-picker" role="radiogroup" aria-label="Rate this recipe from 1 to 5 stars">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              aria-checked={selected === value}
              aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
              className={value <= selected ? "star-choice selected" : "star-choice"}
              key={value}
              onClick={() => { setSelected(value); setMessage(""); setError(""); }}
              role="radio"
              type="button"
            >
              ★
            </button>
          ))}
        </div>
        <button className="button" disabled={!selected || isSaving} onClick={submitRating} type="button">
          {isSaving ? "Saving…" : "Submit rating"}
        </button>
      </div>
      {message && <p className="rating-message" role="status">{message}</p>}
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}
