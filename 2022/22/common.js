export function getNextDirection(direction, rotation) {
  switch (rotation) {
    case 'R':
      switch (direction) {
        case 'R':
          return 'D';
        case 'D':
          return 'L';
        case 'L':
          return 'U';
        case 'U':
          return 'R';
      }
      break;
    case 'L':
      switch (direction) {
        case 'R':
          return 'U';
        case 'D':
          return 'R';
        case 'L':
          return 'D';
        case 'U':
          return 'L';
      }
      break;
  }
}
