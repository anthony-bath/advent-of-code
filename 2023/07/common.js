export const HandType = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1,
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

export function classify(useJokers) {
  return (cards) => {
    const countByCard = {};

    for (const card of cards) {
      if (!(card.label in countByCard)) {
        countByCard[card.label] = 1;
      } else {
        countByCard[card.label]++;
      }
    }

    const values = Object.values(countByCard).sort((a, b) => b - a);
    const jokers = useJokers ? countByCard['J'] ?? 0 : 0;

    switch (Object.keys(countByCard).length) {
      case 1:
        return HandType.FiveOfAKind;

      case 2:
        if (values[0] === 4) {
          return jokers ? HandType.FiveOfAKind : HandType.FourOfAKind;
        } else {
          return jokers ? HandType.FiveOfAKind : HandType.FullHouse;
        }

      case 3:
        if (values[0] === 3) {
          return jokers ? HandType.FourOfAKind : HandType.ThreeOfAKind;
        } else {
          switch (jokers) {
            case 0:
              return HandType.TwoPair;

            case 1:
              return HandType.FullHouse;

            case 2:
              return HandType.FourOfAKind;
          }
        }
      case 4:
        return jokers ? HandType.ThreeOfAKind : HandType.OnePair;

      case 5:
        return jokers ? HandType.OnePair : HandType.HighCard;
    }
  };
}
