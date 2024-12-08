export function part2({ data }) {
  const input = data.split('');

  function getDecompressedLength(input) {
    if (input.indexOf('(') === -1) {
      return input.length;
    }

    let length = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === '(') {
        const marker = [];

        while (input[i] !== ')') {
          marker.push(input[i++]);
        }

        i++;

        const [charCount, repeatCount] = marker
          .join('')
          .match(/\d+/g)
          .map((n) => Number(n));

        const chars = input.slice(i, i + charCount);

        length += repeatCount * getDecompressedLength(chars);
        i += charCount - 1;
      } else {
        length++;
      }
    }

    return length;
  }

  return getDecompressedLength(input);
}
