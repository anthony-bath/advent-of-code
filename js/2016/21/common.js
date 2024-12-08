const numbers = /\d+/g;
const letters = /letter [a-z]/g;

function swap(p1, p2, array) {
  const temp = array[p2];

  array[p2] = array[p1];
  array[p1] = temp;
}

function rotate(array, steps, right) {
  if (right) {
    while (steps > 0) {
      array.unshift(array.pop());
      steps--;
    }
  } else {
    while (steps > 0) {
      array.push(array.shift());
      steps--;
    }
  }
}

export function scramble(instructions, password) {
  for (const line of instructions) {
    if (line.startsWith('swap position')) {
      const [pos1, pos2] = line.match(numbers).map((n) => Number(n));
      swap(pos1, pos2, password);
    } else if (line.startsWith('swap letter')) {
      const [l1, l2] = line.match(letters).map((x) => x.replace('letter ', ''));

      const pos1 = password.indexOf(l1);
      const pos2 = password.indexOf(l2);

      swap(pos1, pos2, password);
    } else if (line.startsWith('rotate based')) {
      const letter = line.match(letters)[0].replace('letter ', '');
      const pos = password.indexOf(letter);

      rotate(password, 1 + pos + (pos >= 4 ? 1 : 0), true);
    } else if (line.startsWith('rotate')) {
      let steps = Number(line.match(numbers)[0]) % password.length;
      rotate(password, steps, line.includes('right'));
    } else if (line.startsWith('reverse')) {
      const [start, end] = line.match(numbers).map((n) => Number(n));
      const newPassword = password.slice(0, start);

      newPassword.push(...password.slice(start, end + 1).reverse());
      newPassword.push(...password.slice(end + 1));

      password = newPassword;
    } else {
      const [pos1, pos2] = line.match(numbers).map((n) => Number(n));
      const removed = password.splice(pos1, 1)[0];

      password.splice(pos2, 0, removed);
    }
  }

  return password.join('');
}
