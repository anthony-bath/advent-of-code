export function part1({ data }) {
  const sequence = data.split('').map(Number);
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

  return nextSequence.slice(0, 8).join('');
}
