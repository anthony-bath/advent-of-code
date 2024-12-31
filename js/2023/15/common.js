export function hash(str) {
  return [...str].reduce(
    (currentValue, letter) => ((currentValue + letter.charCodeAt(0)) * 17) % 256,
    0
  );
}
