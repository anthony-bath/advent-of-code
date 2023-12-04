import Foundation

let fileURL = URL(fileURLWithPath: "2023/04/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

var copiesByCardId: [Int: Int] = [:]

let count = lines.reduce(0) { count, card in
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

print("2023 Day 4 Part 2: \(count)")
