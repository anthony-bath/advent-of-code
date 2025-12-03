import Algorithms
import Foundation

extension Year2025 {
  struct Day03: AdventDay {
    var lines: [String]
    let MAX_POSITION: Int

    init(data _: String, lines: [String]) {
      self.lines = lines
      MAX_POSITION = lines[0].count - 1
    }

    func part1() -> Any {
      lines.reduce(0) { $0 + getJoltage(from: $1, size: 2) }
    }

    func part2() -> Any {
      lines.reduce(0) { $0 + getJoltage(from: $1, size: 12) }
    }

    private func getJoltage(from line: String, size: Int) -> Int {
      var values: [Int: [Int]] = Dictionary(uniqueKeysWithValues: (1 ... 9).map { ($0, []) })

      for (i, joltage) in line.enumerated() {
        values[Int(String(joltage))!]!.append(i)
      }

      var lastIndex = -1
      var bankJoltage = 0

      outer: for position in stride(from: size, to: -1, by: -1) {
        for joltage in stride(from: 9, to: 0, by: -1) {
          guard let indices = values[joltage], indices.count > 0 else { continue }

          for index in indices {
            guard index > lastIndex else { continue }

            if index + position - 1 <= MAX_POSITION {
              bankJoltage += (joltage * Math.powInt(10, position - 1))
              lastIndex = index
              continue outer
            }
          }
        }
      }

      return bankJoltage
    }
  }
}
