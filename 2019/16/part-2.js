const { abs } = Math;

export function part2({ data }) {
  const sequence = data.split('').map(Number);
  const offset = Number(sequence.slice(0, 7).join(''));

  const REPEATS = 10000;

  let fullSequence = [];

  for (let i = 0; i < REPEATS; i++) {
    fullSequence.push(...sequence);
  }

  fullSequence = fullSequence.slice(offset);

  const PHASES = 100;

  for (let phase = 0; phase < PHASES; phase++) {
    for (let i = fullSequence.length - 1; i >= 0; i--) {
      fullSequence[i] = abs(((fullSequence[i + 1] || 0) + fullSequence[i]) % 10);
    }
  }

  return fullSequence.slice(0, 8).join('');
}
