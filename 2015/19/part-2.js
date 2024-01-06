export function part2({ lines }) {
  const inverseTransformations = {};
  let molecule;

  lines.forEach((line) => {
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
        copy = `${copy.substring(0, match.index)}${
          inverseTransformations[piece][0]
        }${copy.substring(match.index + piece.length)}`;
        count++;

        if (copy.length === 1) break;
      }
    }
  }

  return count;
}
