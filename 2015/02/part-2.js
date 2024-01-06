export function part2({ lines }) {
  const expr = /\d+/g;

  return lines.reduce((totalArea, dimensions) => {
    const [l, w, h] = dimensions.match(expr).map((n) => Number(n));

    const p1 = 2 * (l + w);
    const p2 = 2 * (l + h);
    const p3 = 2 * (w + h);

    return totalArea + l * w * h + Math.min(p1, p2, p3);
  }, 0);
}
