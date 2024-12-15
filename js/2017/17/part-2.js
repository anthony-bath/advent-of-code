export function part2({ data }) {
  const steps = Number(data);

  let position = 0;
  let value = 0;

  for (let i = 1; i <= 50000000; i++) {
    position = ((position + steps) % i) + 1;

    if (position === 1) {
      value = i;
    }
  }

  return value;
}
