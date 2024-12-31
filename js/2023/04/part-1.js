export function part1({ lines }) {
  const WINNING_NUMBER_COUNT = 10;

  return lines.reduce((score, card) => {
    const numbers = card.match(/\d+/g).slice(1);
    const winningNumbers = numbers.slice(0, WINNING_NUMBER_COUNT);
    const myNumbers = numbers.slice(WINNING_NUMBER_COUNT);
    const matches = myNumbers.filter((n) => winningNumbers.includes(n)).length;

    return score + (matches > 0 ? 1 << (matches - 1) : 0);
  }, 0);
}
