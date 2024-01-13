export function part2() {
  function getNextHaltingValue(input) {
    let y = input | 65536;
    let x = 832312;

    while (y > 0) {
      x = (((x + (y & 255)) & 16777215) * 65899) & 16777215;
      y >>= 8;
    }

    return x;
  }

  let x = 0;
  const seen = [];

  while (!seen.includes(x)) {
    seen.push(x);
    x = getNextHaltingValue(x);
  }

  return seen[seen.length - 1];
}
