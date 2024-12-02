import Foundation

extension Year2023 {
  class PlayerFactory {
    let handFactory: Year2023.HandFactory

    init(handFactory: Year2023.HandFactory) {
      self.handFactory = handFactory
    }

    func createPlayer(cardData: [String], bid: Int) -> Year2023.Player {
      let hand = handFactory.createHand(cardData: cardData)
      return Year2023.Player(hand: hand, bid: bid)
    }
  }
}
