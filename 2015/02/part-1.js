export function part1(data) {
  const expr = /\d+/g;

  return data.split('\n').reduce((totalArea, dimensions) => {
    const [l, w, h] = dimensions.match(expr).map((n) => Number(n));

    const s1 = l * w;
    const s2 = l * h;
    const s3 = w * h;

    return totalArea + 2 * (s1 + s2 + s3) + Math.min(s1, s2, s3);
  }, 0);
}
