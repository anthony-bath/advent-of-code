export function part2(data) {
  let floor = 0;
  let result = null;

  data.split('').forEach((p, i) => {
    floor += p === '(' ? 1 : -1;

    if (floor === -1 && !result) {
      result = i;
    }
  });

  return result + 1;
}
