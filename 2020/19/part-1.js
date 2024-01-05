import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 19, 1];

const rules = new Map();
const messages = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  if (!line) return;
  if (/^\d/.test(line)) {
    const [number, rule] = line.split(': ');

    if (rule.startsWith('"')) {
      rules.set(number, rule.substring(1, 2));
    } else {
      if (rule.includes('|')) {
        const combos = rule.split(' | ');
        rules.set(
          number,
          combos.map((combo) => combo.split(' '))
        );
      } else {
        rules.set(number, [rule.split(' ')]);
      }
    }
  } else {
    messages.push(line);
  }
});

const cache = {};

function buildRule(number) {
  if (cache[number]) return cache[number];

  const rule = rules.get(number);

  if (typeof rule === 'string') {
    return [rule];
  }

  const matches = [];

  rule.forEach((combo) => {
    const parts = combo.map((ruleNumber) => {
      if (cache[ruleNumber]) {
        return cache[ruleNumber];
      }

      return buildRule(ruleNumber);
    });

    // Dynamic Nested Loop
    const iterations = parts.reduce((product, part) => product * part.length, 1);
    let iteration = 0;

    const indices = Array.from({ length: parts.length }).fill(0);
    const maxIndices = parts.map((part) => part.length - 1);

    while (iteration < iterations) {
      matches.push(parts.map((part, index) => part[indices[index]]).join(''));

      // update loop variables
      let change = true;
      let index = indices.length - 1; // innermost loop

      while (change && index >= 0) {
        if (++indices[index] > maxIndices[index]) {
          indices[index] = 0;
          change = true;
        } else {
          change = false;
        }

        index--;
      }

      iteration++;
    }
  });

  cache[number] = matches;
  return matches;
}

const valids = buildRule('0');
const result = messages.filter((message) => valids.includes(message)).length;

write(YEAR, DAY, PART, result);
