import { read, write } from '../../utilities/io.js';
import { PlayerFactory, HandFactory, sortPlayers, classify } from './common.js';

const [YEAR, DAY, PART] = [2023, 7, 2];

const valueByCard = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
  T: 10,
};

const handFactory = new HandFactory(valueByCard, classify(true));
const playerFactory = new PlayerFactory(handFactory);

const winnings = read(YEAR, DAY, PART)
  .map((line) => {
    const [cardData, bid] = line.split(' ');
    return playerFactory.createPlayer(cardData.split(''), bid);
  })
  .sort(sortPlayers)
  .reduce((total, player, index) => total + (index + 1) * player.bid, 0);

write(YEAR, DAY, PART, winnings);
