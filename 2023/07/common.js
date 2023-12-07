export const CLASSIFICATION_TYPE = {
  FIVE_OF_A_KIND: 7,
  FOUR_OF_A_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

export class Card {
  label;
  value;

  constructor(label, valueByCard) {
    this.label = label;

    if (!(label in valueByCard)) {
      this.value = Number(label);
    } else {
      this.value = valueByCard[label];
    }
  }
}

export class Hand {
  cards;
  classification;

  constructor(cards) {
    this.cards = cards;
  }

  setClassification(classifier) {
    this.classification = classifier(this.cards);
    return this;
  }
}

export class HandFactory {
  valueByCard;
  classifier;

  constructor(valueByCard, classifier) {
    this.valueByCard = valueByCard;
    this.classifier = classifier;
  }

  createHand(cardData) {
    return new Hand(cardData.map((c) => new Card(c, this.valueByCard))).setClassification(
      this.classifier
    );
  }
}

export class PlayerFactory {
  handFactory;

  constructor(handFactory) {
    this.handFactory = handFactory;
  }

  createPlayer(cardData, bid) {
    const hand = this.handFactory.createHand(cardData);
    return new Player(hand, Number(bid));
  }
}

export class Player {
  hand;
  bid;

  constructor(hand, bid) {
    this.hand = hand;
    this.bid = bid;
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
      const p1Value = p1.hand.cards[i].value;
      const p2Value = p2.hand.cards[i].value;

      if (p1Value > p2Value) {
        return 1;
      } else if (p2Value > p1Value) {
        return -1;
      }
    }

    return 0;
  }
}

export function classify1(cards) {
  const countByCard = {};

  for (const card of cards) {
    if (!(card.label in countByCard)) {
      countByCard[card.label] = 1;
    } else {
      countByCard[card.label]++;
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

export function classify2(cards) {
  const countByCard = {};

  for (const card of cards) {
    if (!(card.label in countByCard)) {
      countByCard[card.label] = 1;
    } else {
      countByCard[card.label]++;
    }
  }

  let classificationType;
  const keys = Object.keys(countByCard);
  const values = Object.values(countByCard).sort((a, b) => b - a);
  const jokers = countByCard['J'] ?? 0;

  switch (keys.length) {
    case 1:
      classificationType = CLASSIFICATION_TYPE.FIVE_OF_A_KIND;
      break;

    case 2:
      if (values[0] === 4) {
        classificationType = jokers
          ? CLASSIFICATION_TYPE.FIVE_OF_A_KIND
          : CLASSIFICATION_TYPE.FOUR_OF_A_KIND;
      } else {
        classificationType = jokers
          ? CLASSIFICATION_TYPE.FIVE_OF_A_KIND
          : CLASSIFICATION_TYPE.FULL_HOUSE;
      }
      break;

    case 3:
      if (values[0] === 3) {
        classificationType = jokers
          ? CLASSIFICATION_TYPE.FOUR_OF_A_KIND
          : CLASSIFICATION_TYPE.THREE_OF_A_KIND;
      } else {
        switch (jokers) {
          case 0:
            classificationType = CLASSIFICATION_TYPE.TWO_PAIR;
            break;
          case 1:
            classificationType = CLASSIFICATION_TYPE.FULL_HOUSE;
            break;
          case 2:
            classificationType = CLASSIFICATION_TYPE.FOUR_OF_A_KIND;
        }
      }
      break;

    case 4:
      classificationType = jokers
        ? CLASSIFICATION_TYPE.THREE_OF_A_KIND
        : CLASSIFICATION_TYPE.ONE_PAIR;
      break;

    case 5:
      classificationType = jokers ? CLASSIFICATION_TYPE.ONE_PAIR : CLASSIFICATION_TYPE.HIGH_CARD;
      break;
  }

  return classificationType;
}
