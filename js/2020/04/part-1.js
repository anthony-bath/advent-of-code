export function part1({ lines }) {
  let validCount = 0;
  let fields = [];

  lines.forEach((line) => {
    if (!line) {
      validCount +=
        fields.length === 8 || (fields.length === 7 && fields.indexOf('cid') === -1) ? 1 : 0;

      fields = [];
      return;
    }

    fields.push(...line.split(' ').map((pairs) => pairs.split(':')[0]));
  });

  return validCount;
}
