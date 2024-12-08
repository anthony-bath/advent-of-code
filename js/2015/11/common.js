const Z = 'z'.charCodeAt(0);
const A = 'a'.charCodeAt(0);
const I = 'i'.charCodeAt(0);
const O = 'o'.charCodeAt(0);
const L = 'l'.charCodeAt(0);

export function increment(password) {
  let index = password.length - 1;

  while (true) {
    password[index]++;

    if (password[index] > Z) {
      password[index] = A;
      index--;
    } else {
      break;
    }
  }
}

export function hasBadLetters(password) {
  return [I, O, L].some((c) => password.includes(c));
}

export function hasSequence(password) {
  for (let i = 0; i < password.length - 3; i++) {
    if (password[i + 1] === password[i] + 1 && password[i + 2] === password[i + 1] + 1) {
      return true;
    }
  }

  return false;
}

export function hasTwoDoubles(password) {
  const doubled = new Set();

  let index = 0;
  while (index < password.length) {
    if (password[index] === password[index + 1]) {
      doubled.add(password[index]);
      index += 2;
    } else {
      index++;
    }
  }

  return doubled.size >= 2;
}
