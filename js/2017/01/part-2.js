export function part2({ data }) {
  const input = data.split('').map((n) => Number(n));

  let result = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === input[(i + input.length / 2) % input.length]) {
      result += input[i];
    }
  }

  return result;
}
