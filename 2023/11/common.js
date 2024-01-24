export function getInputElements(lines) {
  const emptyRows = [];
  const emptyCols = [];
  const galaxies = [];

  const grid = lines.map((line, y) => {
    let hasGalaxies = false;
    const row = line.split('');

    for (let x = 0; x < line.length; x++) {
      if (row[x] === '#') {
        galaxies.push({ id: galaxies.length + 1, x, y });
        hasGalaxies = true;
      }
    }

    if (!hasGalaxies) {
      emptyRows.push(y);
    }

    return line;
  });

  const rowIndices = [...Array(grid[0].length).keys()];

  for (let x = 0; x < grid[0].length; x++) {
    if (rowIndices.every((y) => grid[y][x] === '.')) {
      emptyCols.push(x);
    }
  }

  return { galaxies, emptyCols, emptyRows };
}

export function getBlankSpaceBetween(g1, g2, cols, rows, factor) {
  const xMin = Math.min(g1.x, g2.x);
  const yMin = Math.min(g1.y, g2.y);
  const xMax = Math.max(g1.x, g2.x);
  const yMax = Math.max(g1.y, g2.y);

  const colsBetween = cols.filter((col) => col > xMin && col < xMax).length;
  const rowsBetween = rows.filter((row) => row > yMin && row < yMax).length;

  return (colsBetween + rowsBetween) * (factor - 1);
}
