export class Bot {
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

export function getBots(lines) {
  const bots = new Map();

  const valueExpr = /\d+/g;
  const instructionExpr =
    /bot (?<source>\d+) gives low to (?<lowTarget>(bot|output)) (?<lowTargetNumber>\d+) and high to (?<highTarget>(bot|output)) (?<highTargetNumber>\d+)/;

  lines.forEach((line) => {
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

  return bots;
}
