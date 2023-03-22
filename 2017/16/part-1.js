import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 16, 1];

const moves = read(YEAR, DAY, PART, { splitBy: ',' });
let programs = Array.from({ length: 16 }).map((_, i) => String.fromCharCode(i + 97));

function swap(l1, l2) {
  const temp = programs[l1];
  programs[l1] = programs[l2];
  programs[l2] = temp;
}

for (const move of moves) {
  if (move.startsWith('s')) {
    const size = Number(move.match(/\d+/g)[0]);
    programs = [...programs.slice(-size), ...programs.slice(0, 16 - size)];
  } else if (move.startsWith('x')) {
    const [l1, l2] = move.match(/\d+/g).map((n) => Number(n));
    swap(l1, l2);
  } else {
    const [p1, p2] = move.replace('p', '').split('/');
    const l1 = programs.indexOf(p1);
    const l2 = programs.indexOf(p2);

    swap(l1, l2);
  }
}

write(YEAR, DAY, PART, programs.join(''));
