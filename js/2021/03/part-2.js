export function part2({ lines }) {
  const report = lines.map((x) => x.trim());
  const generator = getResultData(report, getMostCommonValue);
  const scrubber = getResultData(report, getLeastCommonValue);

  return parseInt(generator, 2) * parseInt(scrubber, 2);
}

function getResultData(inputData, valueFunc) {
  let bitCounts = getBitCounts(inputData);
  let currentBit = 0;

  while (inputData.length > 1) {
    const targetValue = valueFunc(bitCounts[currentBit]);
    inputData = inputData.filter((x) => [...x][currentBit] === targetValue);
    bitCounts = getBitCounts(inputData);
    currentBit++;
  }

  return inputData[0];
}

function getMostCommonValue(bitData) {
  if (bitData[0] > bitData[1]) {
    return '0';
  } else {
    return '1';
  }
}

function getLeastCommonValue(bitData) {
  if (bitData[0] > bitData[1]) {
    return '1';
  } else {
    return '0';
  }
}

function getBitCounts(array) {
  const bitCounts = [];

  for (const entry of array) {
    [...entry].forEach((value, bit) => {
      if (!bitCounts[bit]) {
        bitCounts[bit] = [0, 0];
      }

      bitCounts[bit][parseInt(value)]++;
    });
  }

  return bitCounts;
}
