import Foundation

extension Year2023 {
  class Hand {
    let cards: [Year2023.Card]
    let classification: HandType

    init(cards: [Year2023.Card], classification: HandType) {
      self.cards = cards
      self.classification = classification
    }
  }
}
