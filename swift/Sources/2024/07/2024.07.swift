import Algorithms

extension Year2024 {
  struct Day07: AdventDay {
    var data: String
    var lines: [String]

    let add: (Int, Int) -> Int = (+)
    let multiply: (Int, Int) -> Int = (*)
    let or: (Int, Int) -> Int = { Int("\($0)\($1)")! }

    func dfs(ops: [(Int, Int) -> Int], target: Int, value: Int, numbers: [Int],
             depth: Int) -> Bool
    {
      if depth == numbers.count - 1 {
        return value == target
      }

      if value > target {
        return false
      }

      for op in ops {
        if dfs(
          ops: ops,
          target: target,
          value: op(value, numbers[depth + 1]),
          numbers: numbers,
          depth: depth + 1
        ) {
          return true
        }
      }

      return false
    }

    func part1() -> Any {
      let expr = #/\d+/#
      let ops = [add, multiply]
      var total = 0

      for line in lines {
        let matches = line.matches(of: expr)
        let left = Int(matches[0].output)!
        let right = matches[1...].map { Int($0.output)! }

        if dfs(ops: ops, target: left, value: right[0], numbers: right, depth: 0) {
          total += left
        }
      }

      return total
    }

    func part2() -> Any {
      let expr = #/\d+/#
      let ops = [add, multiply, or]
      var total = 0

      for line in lines {
        let matches = line.matches(of: expr)
        let left = Int(matches[0].output)!
        let right = matches[1...].map { Int($0.output)! }

        if dfs(ops: ops, target: left, value: right[0], numbers: right, depth: 0) {
          total += left
        }
      }

      return total
    }
  }
}
