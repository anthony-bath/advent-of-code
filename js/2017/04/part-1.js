export function part1({ lines }) {
  let validCount = 0;

  lines.forEach((passphrase) => {
    const words = passphrase.split(' ');

    const lookup = {};
    let isValid = true;

    for (const word of words) {
      if (!lookup[word]) {
        lookup[word] = 1;
      } else {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      validCount++;
    }
  });

  return validCount;
}
