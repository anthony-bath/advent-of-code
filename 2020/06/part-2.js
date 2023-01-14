import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 6, 2];

const input = read(YEAR, DAY, PART);

function calculateGroupScore(group) {
  if (group.length === 1) {
    return group[0].length;
  }

  group.sort((a, b) => a.length - b.length);
  const members = group.slice(1);

  return group[0].reduce((count, question) => {
    return count + (members.every((member) => member.includes(question)) ? 1 : 0);
  }, 0);
}

let total = 0;
let currentGroup = [];

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  if (!line) {
    total += calculateGroupScore(currentGroup);
    currentGroup = [];
  } else {
    currentGroup.push(line.split(''));

    if (i === input.length - 1) {
      total += calculateGroupScore(currentGroup);
    }
  }
}

write(YEAR, DAY, PART, total);
