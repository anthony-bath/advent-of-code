import { readOld, write } from '../../utilities/io.js';
import { Recipe, advance } from './common.js';

const [YEAR, DAY, PART] = [2018, 14, 1];

const RECIPE_COUNT = Number(readOld(YEAR, DAY, PART));

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

write(YEAR, DAY, PART, output.join(''));
