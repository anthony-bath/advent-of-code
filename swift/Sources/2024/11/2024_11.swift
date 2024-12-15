import Algorithms

extension Year2024 {
  struct Day11: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      var stones = data.split(separator: " ").map { Int($0)! }
      var seen = Set<Int>()

      for _ in 0 ..< 25 {
        let count = stones.count

        for i in 0 ..< count {
          let stone = stones[i]

          if stone == 0 {
            stones[i] = 1
            continue
          }

          let str = String(stone)

          if str.count % 2 == 0 {
            let left = Int(str.prefix(str.count / 2))!
            let right = Int(str.suffix(str.count / 2))!

            stones[i] = left
            stones.append(right)

            seen.insert(left)
            seen.insert(right)
          } else {
            stones[i] *= 2024
          }
        }
      }

      return stones.count
    }

    func part2() -> Any {
      0
    }
  }
}
