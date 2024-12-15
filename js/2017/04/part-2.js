function isAnagram(word1, word2) {
  if (word1.length !== word2.length) {
    return false;
  }

  return [...word1].every((letter) => word2.includes(letter));
}

export function part2({ lines }) {
  let validCount = 0;

  lines.forEach((passphrase) => {
    const words = passphrase.split(' ');

    let isValid = true;

    for (const [i, word1] of words.entries()) {
      for (const [j, word2] of words.entries()) {
        if (i === j) continue;

        if (isAnagram(word1, word2)) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        break;
      }
    }

    if (isValid) {
      validCount++;
    }
  });

  return validCount;
}
