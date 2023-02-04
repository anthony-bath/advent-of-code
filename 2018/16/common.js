function addr(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] + registers[B];
  return result;
}

function addi(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] + B;
  return result;
}

function mulr(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] * registers[B];
  return result;
}

function muli(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] * B;
  return result;
}

function banr(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] & registers[B];
  return result;
}

function bani(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] & B;
  return result;
}

function borr(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] | registers[B];
  return result;
}

function bori(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] | B;
  return result;
}

function setr(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A];
  return result;
}

function seti(registers, A, B, C) {
  const result = [...registers];
  result[C] = A;
  return result;
}

function gtir(registers, A, B, C) {
  const result = [...registers];
  result[C] = A > registers[B] ? 1 : 0;
  return result;
}

function gtri(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] > B ? 1 : 0;
  return result;
}

function gtrr(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] > registers[B] ? 1 : 0;
  return result;
}

function eqir(registers, A, B, C) {
  const result = [...registers];
  result[C] = A === registers[B] ? 1 : 0;
  return result;
}

function eqri(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] === B ? 1 : 0;
  return result;
}

function eqrr(registers, A, B, C) {
  const result = [...registers];
  result[C] = registers[A] === registers[B] ? 1 : 0;
  return result;
}

export const commands = [
  addr,
  addi,
  mulr,
  muli,
  banr,
  bani,
  borr,
  bori,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqir,
  eqri,
  eqrr,
];
