import Algorithms

extension Year2024 {
  struct Day16: AdventDay {
    var grid: [[String]]
    var start: Geometry.Point?
    var end: Geometry.Point?

    let deltaByDirection: [Geometry.Direction: (dx: Int, dy: Int)] = [
      .up: (0, -1),
      .down: (0, 1),
      .left: (-1, 0),
      .right: (1, 0),
    ]

    let turnsByDirection: [Geometry.Direction: [Geometry.Direction]] = [
      .up: [.left, .right, .up],
      .down: [.left, .right, .down],
      .left: [.up, .down, .left],
      .right: [.up, .down, .right],
    ]

    init(data _: String, lines: [String]) {
      grid = lines.map { $0.map { String($0) } }

      for y in 0 ..< grid.count {
        for x in 0 ..< grid[y].count {
          if grid[y][x] == "S" {
            start = Geometry.Point(x: x, y: y)
            grid[y][x] = "."
          } else if grid[y][x] == "E" {
            end = Geometry.Point(x: x, y: y)
            grid[y][x] = "."
          }
        }
      }
    }

    func part1() -> Any {
      guard let start = start, let end = end else {
        fatalError("Input does not contain a start or end")
      }

      var current = Item(position: Position(location: start, direction: .right), steps: 0, turns: 0)
      var visited = Set<Position>([current.position])
      var queue = [current]

      while !queue.isEmpty {
        current = queue.removeFirst()

        if current.position.location == end {
          return current.cost
        }

        for direction in turnsByDirection[current.position.direction]! {
          let nextPosition = Position(
            location: current.position.location.add(deltaByDirection[direction]!),
            direction: direction
          )

          if grid.at(nextPosition.location) != "." {
            continue
          }

          if visited.contains(nextPosition) {
            continue
          }

          visited.insert(nextPosition)

          let nextItem = Item(
            position: nextPosition,
            steps: current.steps + 1,
            turns: current.turns + (direction == current.position.direction ? 0 : 1)
          )

          queue.insert(nextItem, at: getInsertIndex(for: nextItem, in: queue))
        }
      }

      return Int.max
    }

    func getInsertIndex(for item: Item, in queue: [Item]) -> Int {
      var low = 0
      var high = queue.count

      while low < high {
        let mid = (low + high) / 2
        if queue[mid].cost > item.cost {
          high = mid
        } else {
          low = mid + 1
        }
      }

      return low
    }

    func part2() -> Any {
      0
    }

    struct Position: Hashable {
      let location: Geometry.Point
      let direction: Geometry.Direction
    }

    struct Item {
      let position: Position
      let steps: Int
      let turns: Int

      var cost: Int {
        1000 * turns + steps
      }
    }
  }
}

// 72416 - Too Low
