export function part2({ data }) {
  const input = data.split('').map(Number);

  const first = input[0];
  let current = first;

  const cups = [];

  for (const cup of input) {
    cups[current] = cup;
    current = cup;
  }

  for (let i = 10; i <= 1000000; i++) {
    cups[current] = i;
    current = i;
  }

  cups[current] = first;
  current = first;

  for (let move = 1; move <= 10000000; move++) {
    const p1 = cups[current];
    const p2 = cups[p1];
    const p3 = cups[p2];
    const p4 = cups[p3];
    const picked = [p1, p2, p3];

    let destination = current;

    do {
      destination = destination - 1;

      if (destination === 0) {
        destination = 1000000;
      }
    } while (picked.includes(destination));

    cups[current] = p4;
    cups[p3] = cups[destination];
    cups[destination] = p1;
    current = p4;
  }

  const next = cups[1];
  return next * cups[next];
}
