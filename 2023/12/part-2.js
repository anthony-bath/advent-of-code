export function part2({ lines }) {
  function count(arrangement, groups) {
    if (!arrangement) {
      return !groups.length ? 1 : 0;
    }

    if (!groups.length) {
      return arrangement.includes('#') ? 0 : 1;
    }

    const key = `${arrangement}-${groups}`;

    if (key in cache) {
      return cache[key];
    }

    let result = 0;

    if (['?', '.'].includes(arrangement[0])) {
      result += count(arrangement.slice(1), groups);
    }

    if (['?', '#'].includes(arrangement[0])) {
      if (
        groups[0] <= arrangement.length &&
        !arrangement.slice(0, groups[0]).includes('.') &&
        (groups[0] === arrangement.length || arrangement[groups[0]] !== '#')
      ) {
        result += count(arrangement.slice(groups[0] + 1), groups.slice(1));
      }
    }

    cache[key] = result;
    return result;
  }

  const cache = {};

  return lines.reduce((total, line) => {
    const [arrangement, springList] = line.split(' ');
    const groups = springList.match(/\d+/g).map((n) => Number(n));
    const unfoldedGroups = Array(5).fill(groups).flat();
    const unfoldedArrangement = Array(5).fill(arrangement).join('?');

    return total + count(unfoldedArrangement, unfoldedGroups);
  }, 0);
}
