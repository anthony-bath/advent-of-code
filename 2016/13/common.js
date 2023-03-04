function isOddParity(num) {
  return [...num.toString(2)].filter((b) => b === '1').length % 2 === 1;
}

export function getLocationType(x, y, offset) {
  const num = x * x + 3 * x + 2 * x * y + y + y * y + offset;

  if (isOddParity(num)) {
    return '#';
  } else {
    return '.';
  }
}
