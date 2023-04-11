import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 19, 2];

const inverseTransformations = {};
let molecule;

read(YEAR, DAY, PART).forEach((line) => {
  if (!line) return;

  if (line.includes('=>')) {
    const [source, transformed] = line.split(' => ');

    if (!(transformed in inverseTransformations)) {
      inverseTransformations[transformed] = [];
    }

    inverseTransformations[transformed].push(source);
  } else {
    molecule = line;
  }
});

let copy = molecule;
let count = 0;

while (copy.length > 1) {
  for (const piece of Object.keys(inverseTransformations)) {
    const match = new RegExp(piece, 'g').exec(copy);

    if (match) {
      copy = `${copy.substring(0, match.index)}${inverseTransformations[piece][0]}${copy.substring(
        match.index + piece.length
      )}`;
      count++;

      if (copy.length === 1) break;
    }
  }
}

write(YEAR, DAY, PART, count);
