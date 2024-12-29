export function part2({ lines }) {
  const directions = lines.map((row) => {
    const [direction, amount] = row.split(' ');
    return [direction, Number(amount)];
  });

  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (const [direction, amount] of directions) {
    switch (direction) {
      case 'forward':
        horizontal += amount;
        depth += aim * amount;
        break;
      case 'up':
        aim -= amount;
        break;
      case 'down':
        aim += amount;
        break;
    }
  }

  return horizontal * depth;
}
