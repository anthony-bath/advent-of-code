export function part1({ lines }) {
  const sectorExpression = new RegExp('\\d+', 'g');
  const checksumExpression = new RegExp('[a-z]+', 'g');

  function checksumSort([l1, c1], [l2, c2]) {
    if (c1 !== c2) {
      return c2 - c1;
    }

    return l1 < l2 ? -1 : 1;
  }

  return lines.reduce((sum, line) => {
    const parts = line.split('-');
    const last = parts.pop();
    const sector = Number(last.match(sectorExpression)[0]);
    const labelledChecksum = last.match(checksumExpression)[0];

    const data = {};

    for (const part of parts) {
      for (const char of part) {
        if (!(char in data)) {
          data[char] = 0;
        }

        data[char]++;
      }
    }

    const actualChecksum = Object.entries(data)
      .sort(checksumSort)
      .map(([l]) => l)
      .join('');

    if (actualChecksum.startsWith(labelledChecksum)) {
      return sum + sector;
    }

    return sum;
  }, 0);
}
