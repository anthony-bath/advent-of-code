import { Recipe } from './common.js';

export function part1({ lines }) {
  const expr = /(?<ingredientList>.+) \(contains (?<allergenList>.+)\)/;

  const recipes = [];
  const possibleIngredientsByAllergen = new Map();
  const safeIngredients = new Set();

  lines.forEach((line) => {
    const { ingredientList, allergenList } = line.match(expr).groups;
    const ingredients = ingredientList.split(' ');
    const allergens = allergenList.split(', ');

    for (const allergen of allergens) {
      if (!possibleIngredientsByAllergen.has(allergen)) {
        possibleIngredientsByAllergen.set(allergen, new Set());
      }

      const possibles = possibleIngredientsByAllergen.get(allergen);

      for (const ingredient of ingredients) {
        possibles.add(ingredient);
        safeIngredients.add(ingredient);
      }
    }

    recipes.push(new Recipe(ingredients, allergens));
  });

  for (const recipe of recipes) {
    for (const allergen of recipe.allergens) {
      const possibleIngredients = possibleIngredientsByAllergen.get(allergen);

      if (possibleIngredients.size === 1) continue;

      for (const ingredient of possibleIngredients) {
        if (!recipe.ingredients.includes(ingredient)) {
          possibleIngredients.delete(ingredient);
        }
      }
    }
  }

  while ([...possibleIngredientsByAllergen.values()].some((possible) => possible.size > 1)) {
    for (const [allergen1, possibleIngredidents1] of possibleIngredientsByAllergen) {
      if (possibleIngredidents1.size > 1) continue;

      const ingredient = [...possibleIngredidents1][0];
      safeIngredients.delete(ingredient);

      for (const [allergen2, possibleIngredients2] of possibleIngredientsByAllergen) {
        if (allergen1 === allergen2) continue;

        possibleIngredients2.delete(ingredient);
      }
    }
  }

  let count = 0;

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      if (safeIngredients.has(ingredient)) count++;
    }
  }

  return count;
}
