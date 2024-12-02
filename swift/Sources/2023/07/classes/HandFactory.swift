import Foundation

extension Year2023 {
  class HandFactory {
    let valueByCard: [String: Int]
    let useJokers: Bool

    init(useJokers: Bool = false) {
      valueByCard = [
        "A": 14,
        "K": 13,
        "Q": 12,
        "J": useJokers ? 1 : 11,
        "T": 10,
      ]
      self.useJokers = useJokers
    }

    private func getClassification(cards: [Year2023.Card]) -> HandType {
      var countByCard: [String: Int] = [:]

      for card in cards {
        if countByCard.keys.contains(card.label) {
          countByCard[card.label] = countByCard[card.label]! + 1
        } else {
          countByCard[card.label] = 1
        }
      }

      let jokers = useJokers ? countByCard["J"] ?? 0 : 0

      if jokers > 0 {
        countByCard.removeValue(forKey: "J")
      }

      var values = countByCard.values.map { Int($0) }.sorted { $0 > $1 }

      if !values.isEmpty {
        values[0] = values[0] + jokers
      }

      switch countByCard.keys.count {
      case 0, 1:
        return .FiveOfAKind

      case 2:
        return values[0] == 4 ? .FourOfAKind : .FullHouse

      case 3:
        return values[0] == 3 ? .ThreeOfAKind : .TwoPair

      case 4:
        return .OnePair

      case 5:
        return .HighCard

      default:
        return .HighCard
      }
    }

    func createHand(cardData: [String]) -> Hand {
      let cards = cardData.map { Year2023.Card(label: $0, valueByCard: self.valueByCard) }
      let classification = getClassification(cards: cards)

      return Hand(cards: cards, classification: classification)
    }
  }

  enum HandType: Int {
    case FiveOfAKind = 7
    case FourOfAKind = 6
    case FullHouse = 5
    case ThreeOfAKind = 4
    case TwoPair = 3
    case OnePair = 2
    case HighCard = 1
  }
}
