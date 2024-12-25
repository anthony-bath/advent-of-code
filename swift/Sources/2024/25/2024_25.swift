import Algorithms

extension Year2024 {
  struct Day25: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      let sections = data.split(separator: "\n\n")
      var keys: [[Int]] = []
      var locks: [[Int]] = []

      for section in sections {
        var columns = Array(repeating: 0, count: 5)

        for i in stride(from: 0, to: section.count, by: 1) {
          if section[section.index(section.startIndex, offsetBy: i)] == "#" {
            columns[i % 6] += 1
          }
        }

        if section.first! == "#" {
          locks.append(columns.map { 7 - $0 })
        } else {
          keys.append(columns)
        }
      }

      var fit = 0

      for lock in locks {
        for key in keys {
          if key.enumerated().allSatisfy({ lock[$0.offset] >= $0.element }) {
            fit += 1
          }
        }
      }

      return fit
    }

    func part2() -> Any {
      0
    }
  }
}
