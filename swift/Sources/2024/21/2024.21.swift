import Algorithms

extension Year2024 {
  struct Day21: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      solve(numberOfRobots: 2)
    }

    func part2() -> Any {
      solve(numberOfRobots: 25)
    }

    func paths(from: Character, to: Character) -> [[String]] {
      let end = keyMap[to]!
      let start = keyMap[from]!
      var paths: [[String]] = []
      var shortestPathLength = Int.max
      var shortestPathChanges = Int.max
      var queue: [KeypadPathState] = [KeypadPathState(
        path: [],
        position: start,
        visited: [],
        changes: 0
      )]

      while !queue.isEmpty {
        var state = queue.removeFirst()

        if state.position == end {
          state.path.append("A")

          if state.path.count < shortestPathLength {
            shortestPathLength = state.path.count
            shortestPathChanges = state.changes
            paths = [state.path.map { String($0) }]
          } else if state.path.count == shortestPathLength {
            if state.changes < shortestPathChanges {
              shortestPathChanges = state.changes
              paths = [state.path.map { String($0) }]
            } else if state.changes == shortestPathChanges {
              paths.append(state.path.map { String($0) })
            }
          }

          continue
        }

        for (delta, dir) in dirByDelta {
          let neighbor = state.position.add(delta)

          guard neighbor.x >= 0 && neighbor.x < 3 && neighbor.y >= 0 && neighbor.y < 4 else {
            continue
          }

          if neighbor == gap || state.visited.contains(neighbor) {
            continue
          }

          queue.append(KeypadPathState(
            path: state.path + [dir],
            position: neighbor,
            visited: state.visited.union([neighbor]),
            changes: state.changes + (dir == state.path.last ? 0 : 1)
          ))
        }
      }

      return paths
    }

    func count(for input: [String], depth: Int, maxDepth: Int, cache: inout [String: Int]) -> Int {
      let cacheKey = "\(input)-\(depth)"

      if let cached = cache[cacheKey] {
        return cached
      }

      var total = 0
      var current = "A"
      let atMaxDepth = depth == maxDepth

      for key in input {
        if key == current {
          total += 1
        } else {
          let nextInputLengths = inputMap["\(current)\(key)"]!.map { $0.count }

          if atMaxDepth {
            total += nextInputLengths.min()!
          } else {
            let nextInputPresses = inputMap["\(current)\(key)"]!
              .map { count(for: $0, depth: depth + 1, maxDepth: maxDepth, cache: &cache) }

            total += nextInputPresses.min()!
          }
        }

        current = key
      }

      cache[cacheKey] = total
      return total
    }

    func solve(numberOfRobots: Int) -> Int {
      var result = 0
      var cache: [String: Int] = [:]

      for line in lines {
        var current: Character = "A"
        var presses = 0

        for next in line {
          let paths = paths(from: current, to: next)
          let pathsPresses = paths.map { count(
            for: $0,
            depth: 1,
            maxDepth: numberOfRobots,
            cache: &cache
          ) }

          presses += pathsPresses.min()!
          current = next
        }

        result += (Int(line.prefix(3))! * presses)
      }

      return result
    }

    struct KeypadPathState {
      var path: [Character]
      var position: Geometry.Point
      var visited: Set<Geometry.Point>
      var changes: Int
    }

    let dirByDelta: [(delta: (dx: Int, dy: Int), dir: Character)] = [
      (delta: (0, -1), dir: "^"),
      (delta: (0, 1), dir: "v"),
      (delta: (-1, 0), dir: "<"),
      (delta: (1, 0), dir: ">"),
    ]

    let keyMap: [Character: Geometry.Point] = [
      "7": Geometry.Point(x: 0, y: 0),
      "8": Geometry.Point(x: 1, y: 0),
      "9": Geometry.Point(x: 2, y: 0),
      "4": Geometry.Point(x: 0, y: 1),
      "5": Geometry.Point(x: 1, y: 1),
      "6": Geometry.Point(x: 2, y: 1),
      "1": Geometry.Point(x: 0, y: 2),
      "2": Geometry.Point(x: 1, y: 2),
      "3": Geometry.Point(x: 2, y: 2),
      "0": Geometry.Point(x: 1, y: 3),
      "A": Geometry.Point(x: 2, y: 3),
    ]

    let gap = Geometry.Point(x: 0, y: 3)

    let inputMap: [String: [[String]]] = [
      "A^": [["<", "A"]],
      "A<": [["v", "<", "<", "A"]],
      "Av": [["v", "<", "A"], ["<", "v", "A"]],
      "A>": [["v", "A"]],
      "^A": [[">", "A"]],
      "^>": [[">", "v", "A"], ["v", ">", "A"]],
      "^v": [["v", "A"]],
      "^<": [["v", "<", "A"]],
      "<^": [[">", "^", "A"]],
      "<A": [[">", ">", "^", "A"]],
      "<v": [[">", "A"]],
      "<>": [[">", ">", "A"]],
      "v^": [["^", "A"]],
      "vA": [[">", "^", "A"], ["^", ">", "A"]],
      "v<": [["<", "A"]],
      "v>": [[">", "A"]],
      ">A": [["^", "A"]],
      ">v": [["<", "A"]],
      "><": [["<", "<", "A"]],
      ">^": [["<", "^", "A"], ["^", "<", "A"]],
    ]
  }
}
