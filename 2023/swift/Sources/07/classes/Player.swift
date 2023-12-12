import Foundation

class Player {
  let hand: Hand
  let bid: Int

  init(hand: Hand, bid: Int) {
    self.hand = hand
    self.bid = bid
  }
}
