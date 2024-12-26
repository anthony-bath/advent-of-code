export function part2({ data }) {
  function addRecipe(score) {
    recipes.push(score);

    if (score == recipeSequence[spotInSequence]) {
      spotInSequence++;
    } else {
      spotInSequence = 0;
    }

    return spotInSequence === recipeSequence.length;
  }

  const recipeSequence = data.split('');
  const recipes = [3, 7];

  let elf1 = 0;
  let elf2 = 1;
  let spotInSequence = 0;

  while (spotInSequence < recipeSequence.length) {
    const sum = recipes[elf1] + recipes[elf2];

    if (sum >= 10) {
      if (addRecipe(1)) {
        return recipes.length - recipeSequence.length;
      }

      addRecipe(sum - 10);
    } else {
      addRecipe(sum);
    }

    elf1 = (elf1 + recipes[elf1] + 1) % recipes.length;
    elf2 = (elf2 + recipes[elf2] + 1) % recipes.length;
  }
}
