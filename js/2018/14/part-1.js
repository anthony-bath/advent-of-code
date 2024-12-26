export function part1({ data }) {
  const RECIPE_COUNT = Number(data);

  const recipes = [3, 7];

  let elf1 = 0;
  let elf2 = 1;

  while (recipes.length < RECIPE_COUNT + 10) {
    const sum = recipes[elf1] + recipes[elf2];

    if (sum >= 10) {
      recipes.push(1);
    }

    recipes.push(sum % 10);

    elf1 = (elf1 + 1 + recipes[elf1]) % recipes.length;
    elf2 = (elf2 + 1 + recipes[elf2]) % recipes.length;
  }

  return recipes.slice(RECIPE_COUNT, RECIPE_COUNT + 10).join('');
}
