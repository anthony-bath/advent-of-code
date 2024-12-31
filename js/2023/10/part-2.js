import { getInputElements, walkLoop } from './common.js';

export function part2({ lines }) {
  const { grid, start } = getInputElements(lines);
  const loop = walkLoop(grid, start);

  // Create a grid for only the loop, starting with all '.'
  const loopOnlyGrid = Array(grid.length)
    .fill()
    .map(() => Array(grid[0].length).fill('.'));

  // Use the loop points to add the loop pipe data
  for (const { x, y } of loop) {
    loopOnlyGrid[y][x] = grid[y][x];
  }

  // Calculate area inside the loop
  let area = 0;

  for (let y = 0; y < grid.length; y++) {
    const sections = [];

    // Find all vertical sections of pipe along this row:
    // - For |, flip the "inside" tracking boolean
    // - For F-7 (0 or more -), do not flip the "inside" tracking boolean
    // - For F-J (0 or more -), flip the "inside" tracking boolean
    // - For L-7 (0 or more -), flip the "inside" tracking boolean
    // - For L-J (0 or more -), do not flip the "inside" tracking boolean
    for (const match of loopOnlyGrid[y]
      .join('')
      .matchAll(/(\||F-{0,}7|F-{0,}J|L-{0,}7|L-{0,}J)/g)) {
      sections.push({
        start: match.index,
        end: match.index + match[0].length - 1,
        invert: match[0] === '|' || /F-{0,}J/.test(match[0]) || /L-{0,}7/.test(match[0]),
      });
    }

    let x = 0;
    let inside = false;

    while (x < grid[0].length) {
      const match = sections.find((m) => x >= m.start && x <= m.end);

      if (match) {
        if (match.invert) inside = !inside;
        x = match.end + 1;
      } else {
        // If not within a section of loop pipe within this row, can
        // increment the area if currently inside the loop at this point
        if (inside) area++;
        x++;
      }
    }
  }

  return area;
}
