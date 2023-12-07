export const CLASSIFICATION_TYPE = {
  FIVE_OF_A_KIND: 7,
  FOUR_OF_A_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

export class Hand {
  cards;
  classification;

  constructor(cards, classify) {
    this.cards = cards;
    this.classification = classify(cards);
  }
}

export class Player {
  hand;
  bid;

  constructor(cards, bid, classify) {
    this.hand = new Hand(cards.split(''), classify);
    this.bid = Number(bid);
  }
}

function getCardValue(card, values) {
  if (!(card in values)) {
    return Number(card);
  } else {
    return values[card];
  }
}

/**
 * @param {Player} p1
 * @param {Player} p2
 */
export function sortPlayers(p1, p2) {
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
