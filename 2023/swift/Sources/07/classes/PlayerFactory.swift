import Foundation

class PlayerFactory {
  let handFactory: HandFactory

  init(handFactory: HandFactory) {
    self.handFactory = handFactory
  }

  func createPlayer(cardData: [String], bid: Int) -> Player {
    let hand = handFactory.createHand(cardData: cardData)
    return Player(hand: hand, bid: bid)
  }
}
