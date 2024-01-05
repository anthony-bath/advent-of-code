import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 2, 2];

const boxes = readOld(YEAR, DAY, PART).map((line) => line.split(''));

let result = null;

for (const [i, box1] of boxes.entries()) {
  for (const [j, box2] of boxes.entries()) {
    if (i === j) continue;

    let diffs = [];

    for (const [k, l1] of box1.entries()) {
      if (box2[k] !== l1) {
        diffs.push(k);
      }

      if (diffs.length > 1) {
        break;
      }
    }

    if (diffs.length === 1) {
      box1.splice(diffs.shift(), 1);
      result = box1.join('');
      break;
    }
  }

  if (result) break;
}

write(YEAR, DAY, PART, result);
