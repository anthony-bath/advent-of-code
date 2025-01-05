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

      var current = Item(
        position: Position(location: start, direction: .right),
        steps: 0,
        turns: 0,
        path: [Position(location: start, direction: .right)]
      )

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
            turns: current.turns + (direction == current.position.direction ? 0 : 1),
            path: current.path + [nextPosition]
          )

          queue.insert(nextItem, at: getInsertIndex(for: nextItem, in: queue))
        }
      }

      fatalError("No path found")
    }

    func part2() -> Any {
      guard let start = start, let end = end else {
        fatalError("Input does not contain a start or end")
      }

      let available = part1() as! Int
      var costByPosition = [Position: Int]()

      costByPosition[Position(location: start, direction: .right)] = 0

      let position = Position(location: start, direction: .right)

      var queue = [Item(
        position: position,
        steps: 0,
        turns: 0,
        path: [position]
      )]

      var bestPoints = Set<Geometry.Point>()

      while !queue.isEmpty {
        let current = queue.removeFirst()

        if current.cost > available {
          continue
        }

        if current.position.location == end {
          bestPoints.formUnion(current.path.map { $0.location })
          continue
        }

        for direction in turnsByDirection[current.position.direction]! {
          let nextPosition = Position(
            location: current.position.location.add(deltaByDirection[direction]!),
            direction: direction
          )

          if grid.at(nextPosition.location) != "." {
            continue
          }

          let cost = direction == current.position.direction ? 1 : 1001

          if costByPosition[nextPosition] ?? .max < current.cost + cost {
            continue
          }

          costByPosition[nextPosition] = current.cost + cost

          queue.append(
            Item(
              position: nextPosition,
              steps: current.steps + 1,
              turns: current.turns + (direction == current.position.direction ? 0 : 1),
              path: current.path + [nextPosition]
            )
          )
        }
      }

      return bestPoints.count
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

    struct Position: Hashable {
      let location: Geometry.Point
      let direction: Geometry.Direction
    }

    struct Item {
      let position: Position
      let steps: Int
      let turns: Int
      let path: [Position]

      var cost: Int {
        1000 * turns + steps
      }
    }
  }
}
