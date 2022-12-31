export function getKey([x, y, z]) {
  return `${x}-${y}-${z}`;
}

export function getNeighbors([x, y, z]) {
  return [
    [x + 1, y, z],
    [x - 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ];
}
