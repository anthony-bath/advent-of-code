export const DIR = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

export function move(x, y, dir, layout) {
  if (layout[y][x] === '+') {
    if (layout[y - 1][x] === '|' && dir !== DIR.SOUTH) {
      return DIR.NORTH;
    }

    if (layout[y + 1][x] === '|' && dir !== DIR.NORTH) {
      return DIR.SOUTH;
    }

    if (layout[y][x - 1] === '-' && dir !== DIR.EAST) {
      return DIR.WEST;
    }

    if (layout[y][x + 1] === '-' && dir !== DIR.WEST) {
      return DIR.EAST;
    }
  }

  return dir;
}
