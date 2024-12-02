import Foundation

extension Year2023 {
  class Player {
    let hand: Year2023.Hand
    let bid: Int

    init(hand: Year2023.Hand, bid: Int) {
      self.hand = hand
      self.bid = bid
    }
  }
}
