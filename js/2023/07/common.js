export class HandFactory {
  valueByCard;
  classifier;

  constructor(useJokers = false) {
    this.valueByCard = {
      A: 14,
      K: 13,
      Q: 12,
      J: useJokers ? 1 : 11,
      T: 10,
    };

    this.classifier = classify(useJokers);
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

const HandType = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1,
};

class Card {
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

class Hand {
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

class Player {
  hand;
  bid;

  constructor(hand, bid) {
    this.hand = hand;
    this.bid = bid;
  }
}

function classify(useJokers) {
  return (cards) => {
    const countByCard = {};

    for (const card of cards) {
      if (!(card.label in countByCard)) {
        countByCard[card.label] = 1;
      } else {
        countByCard[card.label]++;
      }
    }

    const jokers = useJokers ? countByCard['J'] ?? 0 : 0;

    if (jokers) {
      delete countByCard['J'];
    }

    const values = Object.values(countByCard).sort((a, b) => b - a);
    values[0] += jokers;

    switch (Object.keys(countByCard).length) {
      case 0:
      case 1:
        return HandType.FiveOfAKind;

      case 2:
        if (values[0] === 4) {
          return HandType.FourOfAKind;
        } else {
          return HandType.FullHouse;
        }

      case 3:
        if (values[0] === 3) {
          return HandType.ThreeOfAKind;
        } else {
          return HandType.TwoPair;
        }

      case 4:
        return HandType.OnePair;

      case 5:
        return HandType.HighCard;
    }
  };
}
