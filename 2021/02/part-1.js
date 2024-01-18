export function part1({ lines }) {
  const directions = lines.map((row) => {
    const [direction, amount] = row.split(' ');
    return [direction, Number(amount)];
  });

  let horizontal = 0;
  let depth = 0;

  for (const [direction, amount] of directions) {
    switch (direction) {
      case 'forward':
        horizontal += amount;
        break;
      case 'up':
        depth -= amount;
        break;
      case 'down':
        depth += amount;
        break;
    }
  }

  return horizontal * depth;
}
