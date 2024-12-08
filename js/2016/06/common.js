export function getPositionData(lines) {
  const positionData = [...Array(8).keys()].map((_) => ({}));

  lines.forEach((line) => {
    const parts = line.split('');

    for (const [position, letter] of parts.entries()) {
      const data = positionData[position];

      if (!(letter in data)) {
        data[letter] = 1;
      } else {
        data[letter]++;
      }
    }
  });

  return positionData;
}
