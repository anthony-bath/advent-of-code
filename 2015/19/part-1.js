import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 19, 1];

const transformations = {};
let molecule;

read(YEAR, DAY, PART).forEach((line) => {
  if (!line) return;

  if (line.includes('=>')) {
    const [source, transformed] = line.split(' => ');

    if (!(source in transformations)) {
      transformations[source] = [];
    }

    transformations[source].push(transformed);
  } else {
    molecule = line;
  }
});

let possibles = new Set();

for (const source in transformations) {
  const possibleTransformations = transformations[source];

  for (const possibleTransformation of possibleTransformations) {
    let copy = molecule;
    const expr = new RegExp(source, 'g');

    let match;

    while ((match = expr.exec(copy))) {
      const transformed = `${copy.substring(
        0,
        match.index
      )}${possibleTransformation}${copy.substring(match.index + source.length)}`;

      possibles.add(transformed);
      copy = molecule;
    }
  }
}

write(YEAR, DAY, PART, possibles.size);
