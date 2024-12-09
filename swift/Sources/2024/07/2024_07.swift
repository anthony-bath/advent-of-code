import Algorithms

extension Year2024 {
  struct Day07: AdventDay {
    var data: String
    var lines: [String]

    let add: (Int, Int) -> Int = (+)
    let multiply: (Int, Int) -> Int = (*)
    let or: (Int, Int) -> Int = { Int("\($0)\($1)")! }

    func part1() -> Any {
      let expr = #/\d+/#
      var cache: [Int: [[(Int, Int) -> Int]]] = [:]
      var total = 0

      for line in lines {
        let matches = line.matches(of: expr)
        let left = Int(matches[0].output)!
        let right = matches[1...].map { Int($0.output)! }
        let operations = combinations(
          of: right.count - 1,
          from: [add, multiply],
          using: &cache
        )

        for combo in operations {
          let value = calculate(right, combo)

          if value == left {
            total += left
            break
          }
        }
      }

      return total
    }

    func part2() -> Any {
      let expr = #/\d+/#
      var cache: [Int: [[(Int, Int) -> Int]]] = [:]
      var total = 0

      for line in lines {
        let matches = line.matches(of: expr)
        let left = Int(matches[0].output)!
        let right = matches[1...].map { Int($0.output)! }

        let operations = combinations(
          of: right.count - 1,
          from: [add, multiply, or],
          using: &cache
        )

        for combo in operations {
          let value = calculate(right, combo)

          if value == left {
            total += left
            break
          }
        }
      }

      return total
    }

    // TODO: Add to Utilities
    func combinations<T>(of length: Int, from elements: [T],
                         using cache: inout [Int: [[T]]]) -> [[T]]
    {
      if let cached = cache[length] {
        return cached
      }

      if length == 1 {
        return elements.map { [$0] }
      }

      let smallerCombinations = combinations(of: length - 1, from: elements, using: &cache)
      var result: [[T]] = []

      for combination in smallerCombinations {
        for op in elements {
          result.append(combination + [op])
        }
      }

      cache[length] = result
      return result
    }

    func calculate(_ numbers: [Int], _ operators: [(Int, Int) -> Int]) -> Int {
      var result = numbers[0]

      for (i, op) in operators.enumerated() {
        result = op(result, numbers[i + 1])
      }

      return result
    }
  }
}
