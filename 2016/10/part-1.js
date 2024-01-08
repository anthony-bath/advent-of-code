import { Bot, getBots } from './common.js';

export function part1({ lines }) {
  const bots = getBots(lines);
  const allBots = [...bots.values()];
  const output = new Map();
  let result = null;

  while (true) {
    const botsWithTwoChips = allBots.filter((bot) => bot.high && bot.low);

    if (botsWithTwoChips.length === 0) {
      break;
    }

    const bot = botsWithTwoChips.shift();

    if (bot.low === 17 && bot.high === 61) {
      result = bot.id;
      break;
    }

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
        if (!output.has(bot.lowTargetNumber)) {
          output.set(bot.lowTargetNumber, [bot.low]);
        } else {
          output.get(bot.lowTargetNumber).push(bot.low);
        }
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
        if (!output.has(bot.highTargetNumber)) {
          output.set(bot.highTargetNumber, [bot.high]);
        } else {
          output.get(bot.highTargetNumber).push(bot.high);
        }
    }

    bot.low = null;
    bot.high = null;
  }

  return result;
}
