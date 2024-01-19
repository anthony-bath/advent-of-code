export function part1({ lines }) {
  const input = lines.slice(0, 20);

  const reactor = Array(100)
    .fill(0)
    .map(() =>
      Array(100)
        .fill(0)
        .map(() => Array(100).fill(0))
    );

  for (const line of input) {
    const turnOn = line.startsWith('on');
    const [x1, x2, y1, y2, z1, z2] = line.match(/-?\d+/g).map(Number);

    for (let z = z1; z <= z2; z++) {
      for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
          reactor[z + 50][y + 50][x + 50] = turnOn ? 1 : 0;
        }
      }
    }
  }

  let count = 0;

  for (let z = 0; z < 100; z++) {
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        if (reactor[z][y][x] === 1) count++;
      }
    }
  }

  return count;
}
