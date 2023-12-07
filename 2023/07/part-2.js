import { read, write } from '../../utilities/io.js';
import { PlayerFactory, HandFactory, sortPlayers } from './common.js';

const [YEAR, DAY, PART] = [2023, 7, 2];

const handFactory = new HandFactory(true);
const playerFactory = new PlayerFactory(handFactory);

const winnings = read(YEAR, DAY, PART)
  .map((line) => {
    const [cardData, bid] = line.split(' ');
    return playerFactory.createPlayer(cardData.split(''), bid);
  })
  .sort(sortPlayers)
  .reduce((total, player, index) => total + (index + 1) * player.bid, 0);

write(YEAR, DAY, PART, winnings);
