export function part1({ data }) {
  return Math.max(
    ...data
      .replace(/[FL]/g, '0')
      .replace(/[BR]/g, '1')
      .split('\n')
      .map((line) => {
        const row = parseInt(line.substring(0, 7), 2);
        const col = parseInt(line.substring(7), 2);

        return row * 8 + col;
      })
  );
}
