import fs from "fs";

const grid = [];

fs.readFileSync("./09/input.txt")
  .toString()
  .split("\n")
  .forEach((row) =>
    grid.push(
      row
        .trim()
        .split("")
        .map((p) => parseInt(p))
    )
  );

const basinSizes = [];
const visited = [...Array(grid.length + 1)].map((_) =>
  Array(grid[0].length + 1).fill(false)
);

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const point = grid[i][j];
    const [u, d, l, r] = getAdjacent(grid, i, j);

    if ([u, d, l, r].every((x) => x > point)) {
      basinSizes.push(search(grid, i, j));
    }
  }
}

function search(grid, i, j) {
  visited[i][j] = true;
  let basinSize = 1;

  const [u, d, l, r] = getAdjacent(grid, i, j);

  if (u < 9 && !visited[i - 1][j]) {
    basinSize += search(grid, i - 1, j);
  }

  if (d < 9 && !visited[i + 1][j]) {
    basinSize += search(grid, i + 1, j);
  }

  if (l < 9 && !visited[i][j - 1]) {
    basinSize += search(grid, i, j - 1);
  }

  if (r < 9 && !visited[i][j + 1]) {
    basinSize += search(grid, i, j + 1);
  }

  return basinSize;
}

function getAdjacent(grid, i, j) {
  return [
    i > 0 ? grid[i - 1][j] : 9,
    i < grid.length - 1 ? grid[i + 1][j] : 9,
    j > 0 ? grid[i][j - 1] : 9,
    j < grid[i].length - 1 ? grid[i][j + 1] : 9,
  ];
}

basinSizes.sort((x, y) => y - x);
fs.writeFileSync(
  "./09/part-2/output.txt",
  (basinSizes[0] * basinSizes[1] * basinSizes[2]).toString()
);
