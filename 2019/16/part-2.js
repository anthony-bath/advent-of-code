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
      // Ideally use Math.abs() but it's so slow when run in jest
      let value = ((fullSequence[i + 1] || 0) + fullSequence[i]) % 10;
      fullSequence[i] = value < 0 ? -value : value;
    }
  }

  return fullSequence.slice(0, 8).join('');
}
