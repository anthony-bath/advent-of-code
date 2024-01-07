export const DIR = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

export function getNextDir(currentDir, turn) {
  switch (currentDir) {
    case DIR.NORTH:
      return turn === 'L' ? DIR.WEST : DIR.EAST;
    case DIR.EAST:
      return turn === 'L' ? DIR.NORTH : DIR.SOUTH;
    case DIR.SOUTH:
      return turn === 'L' ? DIR.EAST : DIR.WEST;
    case DIR.WEST:
      return turn === 'L' ? DIR.SOUTH : DIR.NORTH;
  }
}
