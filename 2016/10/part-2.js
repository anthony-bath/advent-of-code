import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 10, 2];

class Bot {
  constructor(id, value) {
    this.id = id;
    this.low = value;
    this.high = null;
  }

  receiveValue(value) {
    if (!this.low) {
      this.low = value;
    } else if (value < this.low) {
      this.high = this.low;
      this.low = value;
    } else {
      this.high = value;
    }
  }

  setInstruction(lowTarget, lowTargetNumber, highTarget, highTargetNumber) {
    this.lowTarget = lowTarget;
    this.lowTargetNumber = lowTargetNumber;
    this.highTarget = highTarget;
    this.highTargetNumber = highTargetNumber;
  }
}

const bots = new Map();

const valueExpr = /\d+/g;
const instructionExpr =
  /bot (?<source>\d+) gives low to (?<lowTarget>(bot|output)) (?<lowTargetNumber>\d+) and high to (?<highTarget>(bot|output)) (?<highTargetNumber>\d+)/;

read(YEAR, DAY, PART).forEach((line) => {
  if (line.startsWith('value')) {
    const [n1, n2] = line.match(valueExpr).map((n) => Number(n));

    if (!bots.has(n2)) {
      bots.set(n2, new Bot(n2, n1));
    } else {
      bots.get(n2).receiveValue(n1);
    }
  } else {
    const { source, lowTarget, lowTargetNumber, highTarget, highTargetNumber } =
      line.match(instructionExpr).groups;

    const id = Number(source);
    let bot = bots.get(id);

    if (!bot) {
      bot = new Bot(id);
      bots.set(id, bot);
    }

    bot.setInstruction(lowTarget, Number(lowTargetNumber), highTarget, Number(highTargetNumber));
  }
});

const output = [];

while (true) {
  const botsWithTwoChips = [...bots.values()].filter((bot) => bot.high && bot.low);

  if (botsWithTwoChips.length === 0) {
    break;
  }

  const bot = botsWithTwoChips.shift();

  switch (bot.lowTarget) {
    case 'bot':
      let lowTargetBot = bots.get(bot.lowTargetNumber);

      if (!lowTargetBot) {
        lowTargetBot = new Bot(bot.lowTargetNumber, bot.low);
        bots.set(bot.lowTargetNumber, lowTargetBot);
      } else {
        lowTargetBot.receiveValue(bot.low);
      }
      break;

    case 'output':
      output[bot.lowTargetNumber] = bot.low;
  }

  switch (bot.highTarget) {
    case 'bot':
      let highTargetBot = bots.get(bot.highTargetNumber);

      if (!highTargetBot) {
        highTargetBot = new Bot(bot.highTargetNumber, bot.high);
        bots.set(bot.highTargetNumber, highTargetBot);
      } else {
        highTargetBot.receiveValue(bot.high);
      }
      break;

    case 'output':
      output[bot.highTargetNumber] = bot.high;
  }

  bot.low = null;
  bot.high = null;
}

write(YEAR, DAY, PART, output[0] * output[1] * output[2]);
