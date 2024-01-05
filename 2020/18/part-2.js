import { readOld, write } from '../../utilities/io.js';
import { EOL } from 'os';

const [YEAR, DAY, PART] = [2020, 18, 2];

function hasPrecedence(operation1, operation2) {
  // if top of stack is ( or ), nothing has precedence
  if (['(', ')'].includes(operation2)) return false;

  // if current operation is *, everything has precedence
  if (operation1 === '*') return true;

  return false;
}

function doNextOperation(operations, values) {
  const operation = operations.pop();
  const v1 = values.pop();
  const v2 = values.pop();

  values.push(operation === '+' ? v1 + v2 : v1 * v2);
}

function evaluate(equation) {
  const tokens = equation.split(' ');
  const values = [];
  const operations = [];

  for (const token of tokens) {
    if (/\d/.test(token)) {
      values.push(Number(token));
    } else {
      switch (token) {
        case '(':
          operations.push(token);
          break;

        case '*':
        case '+':
          while (operations.length && hasPrecedence(token, operations[operations.length - 1])) {
            doNextOperation(operations, values);
          }

          operations.push(token);
          break;

        case ')':
          while (operations[operations.length - 1] !== '(') {
            doNextOperation(operations, values);
          }

          operations.pop();
      }
    }
  }

  while (operations.length) {
    doNextOperation(operations, values);
  }

  return values.pop();
}

const result = readOld(YEAR, DAY, PART, { splitBy: null })
  .replace(/\(\(/g, '( (')
  .replace(/\)\)/g, ') )')
  .replace(/(\()(\d+)/g, '$1 $2')
  .replace(/(\d+)(\))/g, '$1 $2')
  .split(EOL)
  .reduce((total, equation) => total + evaluate(equation), 0);

write(YEAR, DAY, PART, result);
