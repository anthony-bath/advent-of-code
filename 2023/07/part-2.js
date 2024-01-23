import { PlayerFactory, HandFactory, sortPlayers } from './common.js';

export function part2({ lines }) {
  const handFactory = new HandFactory(true);
  const playerFactory = new PlayerFactory(handFactory);

  return lines
    .map((line) => {
      const [cardData, bid] = line.split(' ');
      return playerFactory.createPlayer(cardData.split(''), bid);
    })
    .sort(sortPlayers)
    .reduce((total, player, index) => total + (index + 1) * player.bid, 0);
}
