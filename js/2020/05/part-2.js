export function part2({ data }) {
  const seatIds = data
    .replace(/[FL]/g, '0')
    .replace(/[BR]/g, '1')
    .split('\n')
    .map((line) => {
      const row = parseInt(line.substring(0, 7), 2);
      const col = parseInt(line.substring(7), 2);

      return row * 8 + col;
    })
    .sort((a, b) => a - b);

  return 1 + seatIds.find((id, index) => seatIds[index + 1] !== id + 1);
}
