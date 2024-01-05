export function part2(data) {
  const double = /([a-z][a-z]).*\1/;
  const triple = /([a-z])[a-z]\1/;

  let niceCount = 0;

  data.split('\n').forEach((string) => {
    if (double.test(string) && triple.test(string)) {
      niceCount++;
    }
  });

  return niceCount;
}
