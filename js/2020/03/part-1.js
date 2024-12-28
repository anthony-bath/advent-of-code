export function part1({ grid }) {
  const W = grid[0].length;
  const H = grid.length;

  let treesEncountered = 0;

  const position = { x: 0, y: 0 };

  while (position.y < H) {
    const { x, y } = position;

    if (grid[y][x] === '#') {
      treesEncountered += 1;
    }

    position.x += 3;
    position.y += 1;

    if (position.x >= W) {
      position.x = position.x % W;
    }
  }

  return treesEncountered;
}
