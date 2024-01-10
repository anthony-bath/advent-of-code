export function part2({ lines }) {
  const maze = lines.map(Number);

  let location = 0;
  let steps = 0;

  while (location < maze.length) {
    const offset = maze[location];

    if (offset >= 3) {
      maze[location]--;
    } else {
      maze[location]++;
    }

    location += offset;
    steps++;
  }

  return steps;
}
