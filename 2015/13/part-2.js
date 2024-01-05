export function part2(data) {
  const expr =
    /(?<person>\w+) would (?<type>(gain|lose)) (?<diff>\d+) happiness units by sitting next to (?<next>\w+)./;

  const people = new Map();

  data.split('\n').forEach((line) => {
    const { person, type, diff, next } = line.match(expr).groups;

    if (!people.has(person)) {
      people.set(person, { [next]: Number(`${type === 'lose' ? '-' : ''}${diff}`) });
    } else {
      people.get(person)[next] = Number(`${type === 'lose' ? '-' : ''}${diff}`);
    }
  });

  for (const [_, data] of people) {
    data['Me'] = 0;
  }

  people.set(
    'Me',
    [...people.keys()].reduce((data, person) => ({ ...data, [person]: 0 }), {})
  );

  let maxChange = -Infinity;

  for (const person of people.keys()) {
    if (person === 'Me') continue;

    const queue = [{ change: 0, order: ['Me', person] }];

    while (queue.length) {
      const current = queue.shift();
      const currentPerson = current.order.slice(-1)[0];

      if (current.order.length === people.size) {
        maxChange = Math.max(current.change, maxChange);
        continue;
      }

      const data = people.get(current.order[current.order.length - 1]);
      const choices = Object.keys(data).filter((person) => !current.order.includes(person));

      for (const person of choices) {
        const change = data[person] + people.get(person)[currentPerson];
        queue.push({ change: current.change + change, order: [...current.order, person] });
      }
    }
  }

  return maxChange;
}
