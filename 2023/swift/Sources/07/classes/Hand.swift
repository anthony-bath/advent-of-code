import Foundation

class Hand {
  let cards: [Card]
  let classification: HandType

  init(cards: [Card], classification: HandType) {
    self.cards = cards
    self.classification = classification
  }
}
