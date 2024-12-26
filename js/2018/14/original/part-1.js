import { Recipe, advance } from '../common.js';

export function part1({ data }) {
  const RECIPE_COUNT = Number(data);

  const recipes = [new Recipe(3), new Recipe(7)];
  let one = recipes[0];
  let two = recipes[1];

  one.setNext(two).setPrev(two);
  two.setNext(one).setPrev(one);

  const head = one;
  let tail = two;
  let count = 2;

  while (true) {
    const newRecipeScores = (one.value + two.value).toString().split('');
    let done = false;

    for (const score of newRecipeScores) {
      const recipe = new Recipe(Number(score));

      recipe.setPrev(tail).setNext(head);
      tail.setNext(recipe);
      tail = recipe;

      count++;

      if (count >= RECIPE_COUNT + 10) {
        done = true;
        break;
      }
    }

    if (done) {
      break;
    }

    one = advance(one);
    two = advance(two);
  }

  const output = [];
  let pointer = tail;

  while (output.length < 10) {
    output.unshift(pointer.value);
    pointer = pointer.prev;
  }

  return output.join('');
}
