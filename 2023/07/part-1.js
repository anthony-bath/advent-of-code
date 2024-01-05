import { readOld, write } from '../../utilities/io.js';
import { PlayerFactory, HandFactory, sortPlayers } from './common.js';

const [YEAR, DAY, PART] = [2023, 7, 1];

const handFactory = new HandFactory();
const playerFactory = new PlayerFactory(handFactory);

const winnings = readOld(YEAR, DAY, PART)
  .map((line) => {
    const [cardData, bid] = line.split(' ');
    return playerFactory.createPlayer(cardData.split(''), bid);
  })
  .sort(sortPlayers)
  .reduce((total, player, index) => total + (index + 1) * player.bid, 0);

write(YEAR, DAY, PART, winnings);
