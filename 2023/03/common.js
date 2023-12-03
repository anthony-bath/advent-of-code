export function getPositions(x, y, len) {
  const positions = [
    [x - 1, y],
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + len, y],
    [x + len, y - 1],
    [x + len, y + 1],
  ];

  for (let i = x; i < x + len; i++) {
    positions.push([i, y - 1]);
    positions.push([i, y + 1]);
  }

  return positions;
}
