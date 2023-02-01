import { read, write } from '../../utilities/io.js';
import { Recipe, advance } from './common.js';

const [YEAR, DAY, PART] = [2018, 14, 2];

const scoreSequence = read(YEAR, DAY, PART)[0];

const start = Number(scoreSequence.at(0));
const end = Number(scoreSequence.slice(-1));
const length = scoreSequence.length;

const recipes = [new Recipe(3), new Recipe(7)];
let one = recipes[0];
let two = recipes[1];

one.setNext(two).setPrev(two);
two.setNext(one).setPrev(one);

const head = one;
let tail = two;
let count = 2;
let lastStartCount = 0;

while (true) {
  const newRecipeScores = (one.value + two.value).toString().split('');
  let done = false;

  for (const score of newRecipeScores) {
    const recipe = new Recipe(Number(score));

    recipe.setPrev(tail).setNext(head);
    tail.setNext(recipe);
    tail = recipe;

    count++;

    if (recipe.value === start) {
      lastStartCount = count;
    }

    if (count - lastStartCount === length - 1 && tail.value === end) {
      let pointer = tail.prev;
      let index = length - 2;

      while (true) {
        if (pointer.value == scoreSequence.at(index)) {
          pointer = pointer.prev;
          index--;
        } else {
          break;
        }
      }

      if (index === -1) {
        done = true;
        break;
      }
    }
  }

  if (done) {
    break;
  }

  one = advance(one);
  two = advance(two);
}

write(YEAR, DAY, PART, count - scoreSequence.length);

// TODO: Come back and improve performance
