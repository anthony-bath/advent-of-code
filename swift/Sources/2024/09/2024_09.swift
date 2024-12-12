import Algorithms

extension Year2024 {
  struct Day09: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      var id = 0
      var expanded: [Int] = []
      var empty = 0

      for index in 0 ..< data.count {
        let count = Int(String(data[data.index(data.startIndex, offsetBy: index)]))!

        if index % 2 == 0 {
          expanded += Array(repeating: id, count: count)
          id += 1
        } else {
          expanded += Array(repeating: -1, count: count)
          empty += count
        }
      }

      var left = 0
      var right = expanded.count - 1

      while left < right {
        while expanded[left] != -1 {
          left += 1
        }

        while expanded[right] == -1 {
          right -= 1
        }

        if left < right {
          expanded[left] = expanded[right]
          expanded[right] = -1
        }
      }

      return expanded[0 ..< expanded.count - empty].indices.reduce(
        0,
        { $0 + $1 * expanded[$1] }
      )
    }

    func part2() -> Any {
      0
    }
  }
}
