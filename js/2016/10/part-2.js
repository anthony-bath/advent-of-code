import { Bot, getBots } from './common.js';

export function part2({ lines }) {
  const bots = getBots(lines);
  const allBots = [...bots.values()];
  const output = [];

  while (true) {
    const botsWithTwoChips = allBots.filter((bot) => bot.high && bot.low);

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

  return output[0] * output[1] * output[2];
}
