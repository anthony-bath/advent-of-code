import { read, write } from '../utility.js';

class Monkey {
  constructor(
    items,
    operator,
    operationValue,
    testDivisibleBy,
    successRecipientIndex,
    failureRecipientIndex
  ) {
    this.items = items;
    this.operator = operator;
    this.operationValue = operationValue;
    this.testDivisibleBy = testDivisibleBy;
    this.successRecipientIndex = successRecipientIndex;
    this.failureRecipientIndex = failureRecipientIndex;
    this.inspections = 0;
  }

  setRecipients(successRecipient, failureRecipient) {
    this.successRecipient = successRecipient;
    this.failureRecipient = failureRecipient;
  }

  turn() {
    while (this.items.length) {
      const item = this.items.shift();
      item.update(this.operator, this.operationValue === 'old' ? null : this.operationValue);
      item.update('/', 3);

      if (item.test(this.testDivisibleBy)) {
        this.successRecipient.catch(item);
      } else {
        this.failureRecipient.catch(item);
      }

      this.inspections += 1;
    }
  }

  catch(item) {
    this.items.push(item);
  }
}

class Item {
  constructor(worryLevel) {
    this.worryLevel = worryLevel;
  }

  test(divisbleBy) {
    return this.worryLevel % divisbleBy === 0;
  }

  update(operator, value) {
    if (!value) {
      value = this.worryLevel;
    }

    switch (operator) {
      case '*':
        this.worryLevel = this.worryLevel * value;
        break;
      case '/':
        this.worryLevel = Math.floor(this.worryLevel / value);
        break;
      case '+':
        this.worryLevel += value;
        break;
      case '-':
        this.worryLevel -= value;
        break;
    }
  }
}

const input = read(11);

const numberExpr = new RegExp(/\d+/g);
const monkeys = [];

for (let i = 0; i < input.length; i += 7) {
  const items = input[i + 1].match(numberExpr).map((n) => new Item(parseInt(n, 10)));
  const [operator, operationValue] = input[i + 2].split(' = old ')[1].trim().split(' ');
  const testDisibleBy = parseInt(input[i + 3].match(numberExpr)[0], 0);
  const successRecipientIndex = parseInt(input[i + 4].match(numberExpr)[0], 0);
  const failureRecipientIndex = parseInt(input[i + 5].match(numberExpr)[0], 0);

  monkeys.push(
    new Monkey(
      items,
      operator,
      parseInt(operationValue, 10),
      testDisibleBy,
      successRecipientIndex,
      failureRecipientIndex
    )
  );
}

monkeys.forEach((monkey) =>
  monkey.setRecipients(monkeys[monkey.successRecipientIndex], monkeys[monkey.failureRecipientIndex])
);

const ROUNDS = 20;

for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach((monkey) => monkey.turn());
}

const inspections = monkeys.map((monkey) => monkey.inspections).sort((a, b) => b - a);

console.log(inspections[0] * inspections[1]);
