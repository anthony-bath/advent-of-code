import Algorithms
import Foundation

extension Year2025 {
  struct Day02: AdventDay {
    let entries: [String]

    init(data: String, lines _: [String]) {
      entries = data.components(separatedBy: ",")
    }

    func part1() -> Any {
      var sum = 0

      for entry in entries {
        let points = entry.components(separatedBy: "-")
        let start = Int(points[0])!
        let end = Int(points[1])!

        for i in stride(from: start, to: end + 1, by: 1) {
          let str = String(i)

          guard str.count % 2 == 0 else { continue }

          if str.prefix(str.count / 2) == str.suffix(str.count / 2) {
            sum += i
          }
        }
      }

      return sum
    }

    func part2() -> Any {
      var sum = 0

      for entry in entries {
        let points = entry.components(separatedBy: "-")
        let start = Int(points[0])!
        let end = Int(points[1])!

        for i in start ..< (end + 1) {
          if isRepeatingPattern(i) {
            sum += i
          }
        }
      }

      return sum
    }

    private func isRepeatingPattern(_ id: Int) -> Bool {
      let str = String(id)
      let len = str.count

      for patternLen in 1 ..< (len / 2 + 1) {
        guard len % patternLen == 0 else { continue }

        let pattern = String(str.prefix(patternLen))
        let repeated = String(repeating: pattern, count: len / patternLen)

        if str == repeated {
          return true
        }
      }

      return false
    }
  }
}
