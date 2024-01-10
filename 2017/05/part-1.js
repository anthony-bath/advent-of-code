export function part1({ lines }) {
  const maze = lines.map(Number);

  let location = 0;
  let steps = 0;

  while (location < maze.length) {
    const offset = maze[location];
    maze[location]++;
    location += offset;
    steps++;
  }

  return steps;
}
