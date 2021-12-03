const fs = require("fs");

const data = fs
  .readFileSync("./03/input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

let bitCounts = getBitCounts(data);

let generatorData = [...data];
let currentBit = 0;

while (generatorData.length > 1) {
  const mostCommonValue = getMostCommonValue(bitCounts[currentBit]);
  generatorData = generatorData.filter(
    (x) => [...x][currentBit] === mostCommonValue
  );
  bitCounts = getBitCounts(generatorData);
  currentBit++;
}

bitCounts = getBitCounts(data);
let scrubberData = [...data];
currentBit = 0;

while (scrubberData.length > 1) {
  const leastCommonValue = getLeastCommonValue(bitCounts[currentBit]);
  scrubberData = scrubberData.filter(
    (x) => [...x][currentBit] === leastCommonValue
  );
  bitCounts = getBitCounts(scrubberData);
  currentBit++;
}

fs.writeFileSync(
  "./03/part-2/output.txt",
  (parseInt(generatorData[0], 2) * parseInt(scrubberData[0], 2)).toString()
);

function getMostCommonValue(bitData) {
  if (bitData[0] > bitData[1]) {
    return "0";
  } else if (bitData[1] > bitData[0]) {
    return "1";
  } else {
    return "1";
  }
}

function getLeastCommonValue(bitData) {
  if (bitData[0] > bitData[1]) {
    return "1";
  } else if (bitData[1] > bitData[0]) {
    return "0";
  } else {
    return "0";
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
