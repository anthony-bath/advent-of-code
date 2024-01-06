export function part2({ lines }) {
  const double = /([a-z][a-z]).*\1/;
  const triple = /([a-z])[a-z]\1/;

  let niceCount = 0;

  lines.forEach((string) => {
    if (double.test(string) && triple.test(string)) {
      niceCount++;
    }
  });

  return niceCount;
}
