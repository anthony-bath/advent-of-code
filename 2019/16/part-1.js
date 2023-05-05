import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 16, 1];

const sequence = read(YEAR, DAY, PART, { splitBy: '' }).map((n) => Number(n));

const basePattern = [0, 1, 0, -1];
const patternsByPosition = new Map();

for (let i = 1; i <= sequence.length; i++) {
  const [a, b, c, d] = basePattern;

  let basePositionPattern = [
    ...Array(i).fill(a),
    ...Array(i).fill(b),
    ...Array(i).fill(c),
    ...Array(i).fill(d),
  ];

  const pattern = [...basePositionPattern];
  pattern.shift();

  while (pattern.length < sequence.length) {
    pattern.push(...basePositionPattern);
  }

  patternsByPosition.set(i, pattern);
}

const PHASES = 100;
let nextSequence = [...sequence];

for (let phase = 0; phase < PHASES; phase++) {
  for (let position = 1; position <= sequence.length; position++) {
    const pattern = patternsByPosition.get(position);

    const rawValue = Math.abs(
      nextSequence.reduce((value, element, index) => {
        return value + element * pattern[index];
      }, 0)
    );

    nextSequence[position - 1] = Number(rawValue.toString().split('').pop());
  }
}

write(YEAR, DAY, PART, nextSequence.slice(0, 8).join(''));
