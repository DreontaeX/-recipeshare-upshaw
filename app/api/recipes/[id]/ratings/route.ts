import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createRating } from "@/lib/recipe-store";
import { isValidRating } from "@/lib/ratings";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("value" in body) || !isValidRating(body.value)) {
    return NextResponse.json({ error: "Rating must be a whole number from 1 to 5." }, { status: 400 });
  }

  const { id } = await params;
  const recipe = await createRating(id, body.value);
  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found." }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath(`/recipes/${id}`);
  return NextResponse.json({ recipe }, { status: 201 });
}
