import Foundation

extension Year2023 {
  class Card {
    let label: String
    let value: Int

    init(label: String, valueByCard: [String: Int]) {
      self.label = label

      if valueByCard.keys.contains(label) {
        value = valueByCard[label]!
      } else {
        value = Int(label)!
      }
    }
  }
}
