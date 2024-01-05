export function part1(data) {
  const expr = /(\d)\1{0,}/g;

  function lookAndSay(sequence) {
    return sequence
      .match(expr)
      .map((match) => `${match.length}${match[0]}`)
      .join('');
  }

  let sequence = data;

  for (let i = 0; i < 40; i++) {
    sequence = lookAndSay(sequence);
  }

  return sequence.length;
}
