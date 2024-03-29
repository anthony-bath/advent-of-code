import { EOL } from 'os';

export function part1({ data }) {
  return data
    .replace(/\(\(/g, '( (')
    .replace(/\)\)/g, ') )')
    .replace(/(\()(\d+)/g, '$1 $2')
    .replace(/(\d+)(\))/g, '$1 $2')
    .split(EOL)
    .reduce((total, equation) => total + evaluate(equation), 0);
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
        case '+':
        case '*':
          operations.push(token);
          break;

        case ')':
          // need to evaluate the last n operations and n+1 values
          // in left to right order
          const startIndex = operations.lastIndexOf('(');
          const operationCount = operations.length - 1 - startIndex;
          const operationsToUse = operations
            .splice(operations.length - (operationCount + 1), operationCount + 1)
            .slice(1);

          const valuesToUse = values.splice(values.length - 1 - operationCount, operationCount + 1);

          while (operationsToUse.length) {
            valuesToUse.unshift(
              eval(`${valuesToUse.shift()} ${operationsToUse.shift()} ${valuesToUse.shift()}`)
            );
          }

          values.push(valuesToUse.shift());
      }
    }
  }

  operations.reverse();
  values.reverse();

  while (operations.length) {
    const operation = operations.pop();
    const v1 = values.pop();
    const v2 = values.pop();

    values.push(operation === '+' ? v1 + v2 : v1 * v2);
  }

  return values.pop();
}
