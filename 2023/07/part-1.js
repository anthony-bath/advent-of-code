import { read, write } from '../../utilities/io.js';
import { Player, CLASSIFICATION_TYPE } from './common.js';

const [YEAR, DAY, PART] = [2023, 7, 1];

const valueByFaceCard = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

function classify(cards) {
  const countByCard = {};

  for (const card of cards) {
    if (!(card in countByCard)) {
      countByCard[card] = 1;
    } else {
      countByCard[card]++;
    }
  }

  let classificationType;
  const keys = Object.keys(countByCard);
  const values = Object.values(countByCard).sort((a, b) => b - a);

  switch (keys.length) {
    case 1:
      classificationType = CLASSIFICATION_TYPE.FIVE_OF_A_KIND;
      break;

    case 2:
      if (values[0] === 4) {
        classificationType = CLASSIFICATION_TYPE.FOUR_OF_A_KIND;
      } else {
        classificationType = CLASSIFICATION_TYPE.FULL_HOUSE;
      }
      break;

    case 3:
      if (values[0] === 3) {
        classificationType = CLASSIFICATION_TYPE.THREE_OF_A_KIND;
      } else {
        classificationType = CLASSIFICATION_TYPE.TWO_PAIR;
      }
      break;

    case 4:
      classificationType = CLASSIFICATION_TYPE.ONE_PAIR;
      break;

    case 5:
      classificationType = CLASSIFICATION_TYPE.HIGH_CARD;
      break;
  }

  return classificationType;
}

function getCardValue(card) {
  if (!(card in valueByFaceCard)) {
    return Number(card);
  } else {
    return valueByFaceCard[card];
  }
}

/**
 * @param {Player} p1
 * @param {Player} p2
 */
function sortPlayers(p1, p2) {
  const p1Classification = p1.hand.classification;
  const p2Classification = p2.hand.classification;

  if (p1Classification > p2Classification) {
    return 1;
  } else if (p2Classification > p1Classification) {
    return -1;
  } else {
    for (let i = 0; i < 5; i++) {
      const p1Value = getCardValue(p1.hand.cards[i]);
      const p2Value = getCardValue(p2.hand.cards[i]);

      if (p1Value > p2Value) {
        return 1;
      } else if (p2Value > p1Value) {
        return -1;
      }
    }

    return 0;
  }
}

const players = read(YEAR, DAY, PART)
  .map((line) => {
    const [cards, bid] = line.split(' ');
    return new Player(cards, bid, classify);
  })
  .sort(sortPlayers);

const winnings = players.reduce((total, player, index) => {
  const rank = index + 1;
  return total + rank * player.bid;
}, 0);

write(YEAR, DAY, PART, winnings);
