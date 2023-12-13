import { read, write } from '../../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 12, 1];

function generateCombinations(str) {
  const combinations = [];

  function generate(current, index) {
    if (index === str.length) {
      combinations.push(current);
      return;
    }

    if (str[index] === '?') {
      generate(current + '.', index + 1);
      generate(current + '#', index + 1);
    } else {
      generate(current + str[index], index + 1);
    }
  }

  generate('', 0);
  return combinations;
}

function evaluate(combos, expr) {
  const n = combos.length;
  const max = Math.pow(combos.length, 5);
  let count = 0;

  for (let i = 0; i < max; i++) {
    const indices = [];
    let num = i;

    for (let j = 0; j < 5; j++) {
      indices.unshift(num % n);
      num = Math.floor(num / n);
    }

    const visited = new Set();
    const arrangement = indices.map((i) => combos[i]).join('?');

    for (const combo of generateCombinations(arrangement)) {
      if (expr.test(combo)) {
        count++;
      }
    }
  }

  console.log(count);
  return count;
}

function generateArrays(length, currentArray, result) {
  if (currentArray.length === length) {
    result.push(currentArray.slice()); // Add a copy of the generated array to the result
    return;
  }

  currentArray.push('.');
  generateArrays(length, currentArray, result);
  currentArray.pop();

  currentArray.push('#');
  generateArrays(length, currentArray, result);
  currentArray.pop();
}

function generateAllArrays(length) {
  const result = [];
  generateArrays(length, [], result);
  return result;
}

const separators = generateAllArrays(4);

const count = read(YEAR, DAY, PART, { test: true }).reduce((count, line) => {
  const [arrangement, springList] = line.split(' ');
  const springCounts = springList.match(/\d+/g);
  const unfoldedSpringCounts = Array(5)
    .fill()
    .flatMap(() => springCounts);

  const springPattern = springCounts.map((count) => `#{${count}}`).join('\\.{1,}');
  const unfoldedSpringPattern = unfoldedSpringCounts.map((count) => `#{${count}}`).join('\\.{1,}');

  const pattern = `^\\.{0,}${springPattern}\\.{0,}$`;
  const unfoldedPattern = `^\\.{0,}${unfoldedSpringPattern}\\.{0,}$`;
  const expr = new RegExp(pattern);
  const unfoldedExpr = new RegExp(unfoldedPattern);

  const matching = [];
  const nonMatching = [];

  for (const combo of generateCombinations(`${arrangement}`)) {
    if (expr.test(combo)) {
      matching.push(combo);
    } else {
      nonMatching.push(combo);
    }
  }

  let c = 0;

  for (const combo1 of matching) {
    for (const combo2 of matching) {
      for (const combo3 of nonMatching) {
        for (const combo4 of matching) {
          for (const combo5 of nonMatching) {
            for (const s of separators) {
              const arrangement = `${combo1}${s[0]}${combo2}${s[1]}${combo3}${s[2]}${combo4}${s[3]}${combo5}`;

              if (unfoldedExpr.test(arrangement)) {
                console.log('yep', s);
                c++;
              }
            }
          }
        }
      }
    }
  }

  console.log(c);

  // if (!c) {
  //   console.log(1);
  //   return count + 1;
  // }

  // const n = matching.length;
  // const n5 = Math.pow(n, 5);
  // const f = n5 / c;

  // const total =
  //   n5 + (4 * n5) / f + (6 * n5) / Math.pow(f, 2) + (4 * n5) / Math.pow(f, 3) + n5 / Math.pow(f, 4);

  // console.log(total);

  return count + 0;
}, 0);

write(YEAR, DAY, PART, '');
