export function part1({ lines }) {
  const inputs = [];
  const outputs = [];

  lines.forEach((line) => {
    const [input, output] = line.trim().split(' | ');
    inputs.push(input);
    outputs.push(output);
  });

  const easyDigitLengths = [2, 3, 4, 7];

  return outputs.reduce(
    (count, output) =>
      count + output.split(' ').filter((digit) => easyDigitLengths.includes(digit.length)).length,
    0
  );
}
