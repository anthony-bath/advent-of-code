import { increment, hasBadLetters, hasSequence, hasTwoDoubles } from './common.js';

export function part1({ data }) {
  const currentPassword = data.split('').map((c) => c.charCodeAt(0));
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

  return nextPasswords.pop();
}
