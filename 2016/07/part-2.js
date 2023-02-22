import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 7, 2];
let count = 0;

read(YEAR, DAY, PART).forEach((line) => {
  const inner = new Set();
  const outer = new Set();
  let supportsSSL = false;
  let parsingOuter = true;

  for (let i = 0; i < line.length; i++) {
    if (line[i] === '[') {
      parsingOuter = false;
      continue;
    }

    if (line[i] === ']') {
      parsingOuter = true;
      continue;
    }

    const substring = line.substring(i, i + 3);

    if (substring.includes('[') || substring.includes(']')) {
      continue;
    }

    if (substring[0] === substring[2] && substring[0] !== substring[1]) {
      if (parsingOuter) {
        outer.add(substring);
      } else {
        inner.add(substring);
      }
    }
  }

  for (const entry of inner) {
    const inverse = `${entry[1]}${entry[0]}${entry[1]}`;

    if (outer.has(inverse)) {
      supportsSSL = true;
      break;
    }
  }

  if (!supportsSSL) {
    for (const entry of outer) {
      const inverse = `${entry[1]}${entry[0]}${entry[1]}`;

      if (inner.has(inverse)) {
        supportsSSL = true;
        break;
      }
    }
  }

  if (supportsSSL) {
    count++;
  }
});

write(YEAR, DAY, PART, count);
