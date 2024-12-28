export function part1({ lines }) {
  let total = 0;
  let currentGroup = new Set();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line) {
      total += currentGroup.size;
      currentGroup = new Set();
    } else {
      line.split('').forEach((question) => currentGroup.add(question));

      if (i === lines.length - 1) {
        total += currentGroup.size;
      }
    }
  }

  return total;
}
