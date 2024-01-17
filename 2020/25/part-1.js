export function part1({ lines }) {
  const SUBJECT_NUMBER = 7;
  const FACTOR = 20201227;
  const [cardPublicKey, doorPublicKey] = lines.map(Number);

  let cardLoopSize = 0;
  let value = 1;

  do {
    value *= SUBJECT_NUMBER;
    value %= FACTOR;
    cardLoopSize++;
  } while (value !== cardPublicKey);

  let result = 1;

  for (let i = 0; i < cardLoopSize; i++) {
    result *= doorPublicKey;
    result %= FACTOR;
  }

  return result;
}
