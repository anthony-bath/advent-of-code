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

  const seen = new Set();
  let x = 0;
  let lastSeen;

  while (!seen.has(x)) {
    seen.add(x);
    lastSeen = x;
    x = getNextHaltingValue(x);
  }

  return lastSeen;
}
