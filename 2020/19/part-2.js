import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 19, 2];

const rules = new Map();
const messages = [];

read(YEAR, DAY).forEach((line) => {
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

const baseRule0 = buildRule('0');
// const rule11 = cache['ll'];
// const rule8 = cache['8'];
const rule42 = cache['42'];
const rule31 = cache['31'];

const matched = [];
const unmatched = [];

// Need to go 8 11
// 8 can be 42 repeating
// 11 can be 42 31 repeating, ending in a 31
// e.g. 42 (8) 42 (11) 31 (11) 31 (11)
// minimum length is therefore 8x4 = 32

messages.forEach((message) => {
  if (baseRule0.includes(message)) {
    matched.push(message);
  } else if (
    rule42.includes(message.substring(0, 8)) &&
    rule31.includes(message.substring(message.length - 8))
  ) {
    unmatched.push(message);
  }
});

unmatched.forEach((message) => {
  const parts = message.match(/.{8}/g);

  // already know the first part matches rule 8 aka rule 42 and last part matches rule 11 end aka rule 31
  parts.shift();
  parts.pop();

  if (parts.every((part) => rule42.includes(part))) {
    matched.push(message);
    return;
  }
});

write(YEAR, DAY, PART, matched.length);
