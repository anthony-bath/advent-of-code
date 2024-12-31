import Algorithms

extension Year2024 {
  struct Day11: AdventDay {
    var stones: [Int]

    init(data: String, lines _: [String]) {
      stones = data.split(separator: " ").map { Int($0)! }
    }

    func part1() -> Any {
      var stones = self.stones

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
          } else {
            stones[i] *= 2024
          }
        }
      }

      return stones.count
    }

    struct CacheItem: Hashable {
      var stone: Int
      var depth: Int
    }

    func part2() -> Any {
      var cache = [CacheItem: Int]()

      func blink(stone: Int) -> (Int, Int?) {
        if stone == 0 {
          return (1, nil)
        }

        let str = String(stone)

        if str.count % 2 == 0 {
          let left = Int(str.prefix(str.count / 2))!
          let right = Int(str.suffix(str.count / 2))!

          return (left, right)
        }

        return (stone * 2024, nil)
      }

      func dfs(stone: Int, depth: Int) -> Int {
        if let cached = cache[CacheItem(stone: stone, depth: depth)] {
          return cached
        }

        let (left, right) = blink(stone: stone)

        if depth == 75 {
          return right != nil ? 2 : 1
        }

        var result = dfs(stone: left, depth: depth + 1)

        if right != nil {
          result += dfs(stone: right!, depth: depth + 1)
        }

        cache[CacheItem(stone: stone, depth: depth)] = result
        return result
      }

      return stones.reduce(0) { $0 + dfs(stone: $1, depth: 1) }
    }
  }
}
