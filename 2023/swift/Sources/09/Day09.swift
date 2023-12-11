import Algorithms

struct Day09: AdventDay {
  var data: String
  var lines: [String]

  func part1() -> Any {
    return lines.reduce(0) { total, line in
      var rows = [line.components(separatedBy: " ").map { Int($0)! }]
      var diffs = differences(rows[0])

      while !diffs.allSatisfy({ $0 == 0 }) {
        rows.append(diffs)
        diffs = differences(rows[rows.count - 1])
      }

      var next = 0

      for i in stride(from: rows.count - 1, to: -1, by: -1) {
        next = next + rows[i].popLast()!
      }

      return total + next
    }
  }

  func part2() -> Any {
    return lines.reduce(0) { total, line in
      let nums = line.components(separatedBy: " ").map { Int($0)! }
      var rows = [Array(nums.reversed())]
      var diffs = differences(rows[0])

      while !diffs.allSatisfy({ $0 == 0 }) {
        rows.append(diffs)
        diffs = differences(rows[rows.count - 1])
      }

      var next = 0

      for i in stride(from: rows.count - 1, to: -1, by: -1) {
        next = next + rows[i].popLast()!
      }

      return total + next
    }
  }

  func differences(_ array: [Int]) -> [Int] {
    var diffs: [Int] = []

    for i in 1 ..< array.count {
      diffs.append(array[i] - array[i - 1])
    }

    return diffs
  }
}
