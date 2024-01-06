export function part1({ lines }) {
  const vowels = /[aeiou]/g;
  const double = /([a-z])\1/;
  const ignore = /(ab|cd|pq|xy)/;

  let niceCount = 0;

  lines.forEach((string) => {
    if (string.match(vowels)?.length >= 3 && double.test(string) && !ignore.test(string)) {
      niceCount++;
    }
  });

  return niceCount;
}
