export function part2({ data }) {
  const input = JSON.parse(data);

  function searchArray(arr) {
    let sum = 0;

    for (const element of arr) {
      if (Array.isArray(element)) {
        sum += searchArray(element);
      } else if (typeof element === 'object') {
        sum += searchObj(element);
      } else if (typeof element === 'number') {
        sum += element;
      }
    }

    return sum;
  }

  function searchObj(obj) {
    let sum = 0;

    for (const key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) {
        sum += searchArray(obj[key]);
      } else if (typeof obj[key] === 'object') {
        sum += searchObj(obj[key]);
      } else if (typeof obj[key] === 'number') {
        sum += obj[key];
      } else if (obj[key] === 'red') {
        return 0;
      }
    }

    return sum;
  }

  return searchObj(input);
}
