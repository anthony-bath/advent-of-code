import Algorithms

struct Day04: AdventDay {
  var data: String
  var lines: [String]

  func part1() -> Any {
    return lines.reduce(0) { score, card in
      let numbers = card.matches(of: #/\d+/#).map { String($0.output) }
      let winningNumbers = Array(numbers[1 ... 10])
      let myNumbers = Array(numbers[11 ..< numbers.count])
      let matches = myNumbers.filter { winningNumbers.contains($0) }

      return score + (matches.count > 0 ? (1 << (matches.count - 1)) : 0)
    }
  }

  func part2() -> Any {
    var copiesByCardId: [Int: Int] = [:]

    return lines.reduce(0) { count, card in
      let numbers = card.matches(of: #/\d+/#).map { String($0.output) }
      let cardId = Int(numbers.first!)!
      let winningNumbers = Array(numbers[1 ... 10])
      let myNumbers = Array(numbers[11 ..< numbers.count])
      let matches = myNumbers.filter { winningNumbers.contains($0) }.count

      if !copiesByCardId.keys.contains(cardId) {
        copiesByCardId[cardId] = 1
      }

      if matches > 0 {
        for nextId in (cardId + 1) ... (cardId + matches) {
          if !copiesByCardId.keys.contains(nextId) {
            copiesByCardId[nextId] = 1
          }

          copiesByCardId[nextId] = copiesByCardId[nextId]! + copiesByCardId[cardId]!
        }
      }

      return count + copiesByCardId[cardId]!
    }
  }
}
