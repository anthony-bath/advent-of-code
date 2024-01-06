export function part1({ data }) {
  let [row, col] = data.match(/\d+/g).map((n) => Number(n));
  let positionValue = ((row - 1) * row) / 2 + 1;
  let colOffsetStart = row + 1;

  for (let i = 0; i < col - 1; i++) {
    positionValue += colOffsetStart++;
  }

  let result = 20151125;

  for (let value = 2; value <= positionValue; value++) {
    result *= 252533;
    result %= 33554393;
  }

  return result;
}
