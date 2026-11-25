export const CUISINES = [
  "American",
  "Arabic",
  "Chinese",
  "German",
  "Indian",
  "Iranian",
  "Italian",
  "Japanese",
  "Mexican",
  "Other",
] as const;

export const CATEGORIES = [
  "Breakfast",
  "Main Dish",
  "Fast Food",
  "Soup",
  "Salad",
  "Dessert",
  "Snack",
  "Drink",
] as const;

export type Cuisine = (typeof CUISINES)[number];
export type Category = (typeof CATEGORIES)[number];

export interface Recipe {
  id: string;
  author: string;
  title: string;
  cuisine: Cuisine;
  category: Category;
  ingredients: string[];
  steps: string[];
  prepTime: number;
  imageUrl: string;
  ratings: number[];
}

export const SEED_RECIPES: Recipe[] = [
  {
    id: "saffron-chicken",
    author: "Niloofar",
    title: "Saffron Chicken & Jeweled Rice",
    cuisine: "Iranian",
    category: "Main Dish",
    ingredients: [
      "2 cups basmati rice",
      "4 chicken thighs",
      "1 small onion, sliced",
      "1/2 teaspoon bloomed saffron",
      "1/3 cup dried barberries",
      "2 tablespoons butter",
      "Salt and black pepper",
    ],
    steps: [
      "Rinse the rice until the water runs clear, then soak for 20 minutes.",
      "Season and sear the chicken. Add onion and a splash of water, cover, and simmer until cooked through.",
      "Parboil the rice, drain, then steam over low heat until fluffy.",
      "Warm the barberries in butter and saffron. Spoon over the rice and serve with the chicken.",
    ],
    prepTime: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85",
    ratings: [5, 5, 4, 5],
  },
  {
    id: "tomato-pasta",
    author: "Marco",
    title: "Sunday Tomato & Basil Pasta",
    cuisine: "Italian",
    category: "Main Dish",
    ingredients: [
      "12 ounces spaghetti",
      "1 pound ripe tomatoes",
      "3 garlic cloves, sliced",
      "A handful of fresh basil",
      "3 tablespoons olive oil",
      "Parmesan, to serve",
    ],
    steps: [
      "Cook the spaghetti in well-salted water until just al dente.",
      "Gently cook the garlic in olive oil, then add chopped tomatoes and simmer until saucy.",
      "Toss the drained pasta with the sauce and a splash of pasta water.",
      "Finish with torn basil and Parmesan.",
    ],
    prepTime: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    ratings: [4, 5, 4],
  },
  {
    id: "miso-noodle-soup",
    author: "Aiko",
    title: "Weeknight Miso Noodle Soup",
    cuisine: "Japanese",
    category: "Soup",
    ingredients: [
      "4 cups vegetable stock",
      "2 tablespoons white miso",
      "6 ounces ramen noodles",
      "1 cup sliced mushrooms",
      "2 baby bok choy",
      "2 green onions, sliced",
    ],
    steps: [
      "Bring the stock to a gentle simmer and cook the mushrooms until tender.",
      "Whisk miso with a little warm stock, then stir it back into the pot.",
      "Cook the noodles separately according to the package directions.",
      "Divide noodles and bok choy between bowls, pour over the broth, and top with green onion.",
    ],
    prepTime: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85",
    ratings: [5, 4],
  },
  {
    id: "chocolate-cake",
    author: "Sam",
    title: "One-Bowl Chocolate Cake",
    cuisine: "American",
    category: "Dessert",
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "1 cup sugar",
      "1/3 cup cocoa powder",
      "1 teaspoon baking soda",
      "1 cup milk",
      "1/3 cup neutral oil",
    ],
    steps: [
      "Heat the oven to 350°F and grease an 8-inch cake pan.",
      "Whisk flour, sugar, cocoa, and baking soda in a large bowl.",
      "Stir in the milk and oil just until smooth.",
      "Bake for 30 minutes, or until a toothpick comes out clean. Cool before slicing.",
    ],
    prepTime: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85",
    ratings: [5, 5, 5, 4],
  },
];

export function averageRating(ratings: number[]): number | null {
  if (ratings.length === 0) return null;
  return ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
}

export function filterRecipes(
  recipes: Recipe[],
  cuisine: string,
  category: string,
): Recipe[] {
  return recipes.filter(
    (recipe) =>
      (!cuisine || recipe.cuisine === cuisine) &&
      (!category || recipe.category === category),
  );
}
