export function part1({ data }) {
  const numbers = data.split(',').map(Number);
  const TURNS = 2020;

  let turn = 1;
  const spoken = new Map();
  let lastSpoken = null;

  while (turn <= TURNS) {
    if (turn <= numbers.length) {
      lastSpoken = numbers[turn - 1];
      spoken.set(lastSpoken, [turn]);
    } else {
      const spokenOnTurns = spoken.get(lastSpoken);

      if (spokenOnTurns.length === 1) {
        lastSpoken = 0;
      } else {
        const lastTwoTurns = spokenOnTurns.slice(-2);
        lastSpoken = lastTwoTurns[1] - lastTwoTurns[0];
      }

      if (spoken.has(lastSpoken)) {
        spoken.set(lastSpoken, [...spoken.get(lastSpoken), turn]);
      } else {
        spoken.set(lastSpoken, [turn]);
      }
    }

    turn++;
  }

  return lastSpoken;
}
