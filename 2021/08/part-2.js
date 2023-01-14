import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 8, 2];

const inputs = [];
const outputs = [];
const displayed = [];

read(YEAR, DAY, PART).forEach((line) => {
  const [input, output] = line.trim().split(' | ');
  inputs.push(input);
  outputs.push(output);
});

inputs.forEach((input, index) => {
  const digits = input.split(' ');
  let digitByCode = new Map();
  let codeByDigit = new Map();

  digits.forEach((digit) => {
    digit = digit.split('').sort().join('');

    switch (digit.length) {
      case 2:
        digitByCode.set(digit, 1);
        codeByDigit.set(1, digit);
        break;

      case 3:
        digitByCode.set(digit, 7);
        codeByDigit.set(7, digit);
        break;

      case 4:
        digitByCode.set(digit, 4);
        codeByDigit.set(4, digit);
        break;

      case 7:
        digitByCode.set(digit, 8);
        codeByDigit.set(8, digit);
        break;
    }
  });

  const oneExp = new RegExp(`[${codeByDigit.get(1)}]`, 'g');
  const middleAndTopLeftSegments = codeByDigit.get(4).replace(oneExp, '').split('');

  const fourSevenExp = new RegExp(`[${codeByDigit.get(4)}${codeByDigit.get(7)}]`, 'g');

  const bottomAndBottomLeftSegments = codeByDigit.get(8).replace(fourSevenExp, '').split('');

  let topRightSegment;

  const _235 = digits.filter((digit) => digit.length === 5);
  const _069 = digits.filter((digit) => digit.length === 6);

  // Identify 0, 6 and 9
  _069.forEach((digit) => {
    digit = digit.split('').sort().join('');

    const missing = codeByDigit.get(8).replace(new RegExp(`[${digit}]`, 'g'), '');

    if (
      !bottomAndBottomLeftSegments.includes(missing) &&
      !middleAndTopLeftSegments.includes(missing)
    ) {
      // must be 6
      digitByCode.set(digit, 6);
      topRightSegment = missing;
    } else if (
      digit.includes(bottomAndBottomLeftSegments[0]) &&
      digit.includes(bottomAndBottomLeftSegments[1])
    ) {
      // must be 0
      digitByCode.set(digit, 0);
    } else {
      // must be 9
      digitByCode.set(digit, 9);
    }
  });

  // Identify 2, 3 and 5
  _235.forEach((digit) => {
    digit = digit.split('').sort().join('');

    if (!digit.includes(topRightSegment)) {
      // must be 5
      digitByCode.set(digit, 5);
    } else if (
      digit.includes(bottomAndBottomLeftSegments[0]) &&
      digit.includes(bottomAndBottomLeftSegments[1])
    ) {
      // must be 2
      digitByCode.set(digit, 2);
    } else {
      // must be 3
      digitByCode.set(digit, 3);
    }
  });

  displayed.push(
    parseInt(
      outputs[index]
        .split(' ')
        .map((digit) => digitByCode.get(digit.split('').sort().join('')))
        .join('')
    )
  );
});

write(
  YEAR,
  DAY,
  PART,
  displayed.reduce((sum, current) => sum + current, 0)
);
