export function part2({ lines }) {
  const values = lines.map((line) => {
    return line
      .trim()
      .split(/\s+/)
      .map((n) => Number(n));
  });

  function isTriangle(a, b, c) {
    return a + b > c && a + c > b && b + c > a;
  }

  let possibleCount = 0;

  for (let row = 0; row < values.length; row += 3) {
    const [a1, a2, a3] = values[row];
    const [b1, b2, b3] = values[row + 1];
    const [c1, c2, c3] = values[row + 2];

    if (isTriangle(a1, b1, c1)) {
      possibleCount++;
    }

    if (isTriangle(a2, b2, c2)) {
      possibleCount++;
    }

    if (isTriangle(a3, b3, c3)) {
      possibleCount++;
    }
  }

  return possibleCount;
}
