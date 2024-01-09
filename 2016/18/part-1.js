export function part1({ data }) {
  const input = data.split('');
  const trapPatterns = ['^^.', '.^^', '^..', '..^'];

  let safeCount = input.filter((t) => t === '.').length;
  const rows = [input];
  let prevRowIndex = 0;

  while (rows.length < 40) {
    const nextRow = [];
    const prevRow = rows[prevRowIndex];

    for (let tile = 0; tile < prevRow.length; tile++) {
      const left = tile - 1 >= 0 ? prevRow[tile - 1] : '.';
      const center = prevRow[tile];
      const right = tile + 1 < prevRow.length ? prevRow[tile + 1] : '.';

      if (trapPatterns.includes(`${left}${center}${right}`)) {
        nextRow.push('^');
      } else {
        safeCount++;
        nextRow.push('.');
      }
    }

    rows.push(nextRow);
    prevRowIndex++;
  }

  return safeCount;
}
