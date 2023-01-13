export function gcd(x, y, ...z) {
  if (!y && z.length > 0) {
    return gcd(x, ...z);
  }

  if (!y) {
    return x;
  }

  return gcd(y, x % y, ...z);
}

export function lcm(x, y, ...z) {
  if (z.length === 0) {
    return (x * y) / gcd(x, y);
  }

  return lcm((x * y) / gcd(x, y), ...z);
}
