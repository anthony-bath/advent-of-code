import { read, write } from '../../utilities/io.js';
import { increment, hasBadLetters, hasSequence, hasTwoDoubles } from './common.js';

const [YEAR, DAY, PART] = [2015, 11, 1];

const currentPassword = read(YEAR, DAY, PART, { splitBy: '' }).map((c) => c.charCodeAt(0));
const nextPasswords = [];

do {
  increment(currentPassword);

  if (
    hasBadLetters(currentPassword) ||
    !hasSequence(currentPassword) ||
    !hasTwoDoubles(currentPassword)
  ) {
    continue;
  } else {
    nextPasswords.push(currentPassword.map((c) => String.fromCharCode(c)).join(''));
  }
} while (nextPasswords.length < 1);

write(YEAR, DAY, PART, nextPasswords.pop());
