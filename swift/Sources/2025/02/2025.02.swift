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

        for i in stride(from: start, to: end + 1, by: 1) {
          guard i > 10 else { continue }

          let str = String(i)
          let max = 1 + str.count / 2

          for j in stride(from: 1, to: max, by: 1) {
            guard str.count % j == 0 else { continue }

            var frontIndex = str.startIndex
            var backIndex = str.index(frontIndex, offsetBy: j)
            let front = str[frontIndex ..< backIndex]
            var allMatch = true

            while backIndex != str.endIndex {
              frontIndex = backIndex
              backIndex = str.index(frontIndex, offsetBy: j, limitedBy: str.endIndex) ?? str
                .endIndex
              let next = str[frontIndex ..< backIndex]

              if next != front {
                allMatch = false
                break
              }
            }

            if allMatch {
              sum += i
              break
            }
          }
        }
      }

      return sum
    }
  }
}
