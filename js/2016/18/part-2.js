export function part2({ data }) {
  const input = data.split('');
  const TRAP_PATTERNS = ['^^.', '.^^', '^..', '..^'];
  const TARGET_ROWS = 400000;

  let safeCount = input.filter((t) => t === '.').length;
  let prevRow = ['.', ...input, '.'];
  let prevRowIndex = 0;

  while (prevRowIndex < TARGET_ROWS - 1) {
    const nextRow = ['.'];

    for (let tile = 1; tile < prevRow.length - 1; tile++) {
      const left = prevRow[tile - 1];
      const center = prevRow[tile];
      const right = prevRow[tile + 1];

      if (TRAP_PATTERNS.includes(`${left}${center}${right}`)) {
        nextRow.push('^');
      } else {
        nextRow.push('.');
        safeCount++;
      }
    }

    nextRow.push('.');

    prevRow = nextRow;
    prevRowIndex++;
  }

  return safeCount;
}
