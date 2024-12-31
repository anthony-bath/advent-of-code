export function part1({ lines }) {
  return lines.reduce((total, line) => {
    const digits = line.match(/\d/g);

    if (digits.length === 1) {
      return total + Number(`${digits[0]}${digits[0]}`);
    }

    return total + Number(`${digits[0]}${digits[digits.length - 1]}`);
  }, 0);
}
