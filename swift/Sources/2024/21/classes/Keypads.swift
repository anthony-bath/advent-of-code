extension Year2024 {
  protocol Keypad {
    var map: [Character: Geometry.Point] { get }
    var gaps: Set<Geometry.Point> { get }
    var W: Int { get }
    var H: Int { get }
    var dirByDelta: [(delta: (dx: Int, dy: Int), dir: Character)] { get }
  }

  struct NumericKeypad: Keypad {
    var map: [Character: Geometry.Point]
    var gaps: Set<Geometry.Point>
    let W = 3
    let H = 4

    init() {
      map = [
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

      gaps = [Geometry.Point(x: 0, y: 3)]
    }
  }

  struct KeypadPathState {
    var path: [Character]
    var position: Geometry.Point
    var visited: Set<Geometry.Point>
  }

  struct DirectionalKeypad: Keypad {
    var map: [Character: Geometry.Point]
    var gaps: Set<Geometry.Point>
    let W = 3
    let H = 2

    init() {
      map = [
        "^": Geometry.Point(x: 1, y: 0),
        "A": Geometry.Point(x: 2, y: 0),
        "<": Geometry.Point(x: 0, y: 1),
        "v": Geometry.Point(x: 1, y: 1),
        ">": Geometry.Point(x: 2, y: 1),
      ]

      gaps = [Geometry.Point(x: 0, y: 0)]
    }
  }
}

extension Year2024.Keypad {
  var dirByDelta: [(delta: (dx: Int, dy: Int), dir: Character)] {
    [
      (delta: (0, -1), dir: "^"),
      (delta: (0, 1), dir: "v"),
      (delta: (-1, 0), dir: "<"),
      (delta: (1, 0), dir: ">"),
    ]
  }

  func paths(from: Geometry.Point, to: Character) -> [[Character]] {
    let target = map[to]!
    var paths: [[Character]] = []
    var shortestPathLength = Int.max
    var queue: [Year2024.KeypadPathState] = [Year2024.KeypadPathState(
      path: [],
      position: from,
      visited: []
    )]

    while !queue.isEmpty {
      let state = queue.removeFirst()

      if state.position == target {
        if state.path.count < shortestPathLength {
          shortestPathLength = state.path.count
          paths = [state.path]
        } else if state.path.count == shortestPathLength {
          paths.append(state.path)
        }

        continue
      }

      for (delta, dir) in dirByDelta {
        let neighbor = state.position.add(delta)

        guard neighbor.x >= 0 && neighbor.x < W && neighbor.y >= 0 && neighbor.y < H else {
          continue
        }

        if gaps.contains(neighbor) || state.visited.contains(neighbor) {
          continue
        }

        queue.append(Year2024.KeypadPathState(
          path: state.path + [dir],
          position: neighbor,
          visited: state.visited.union([neighbor])
        ))
      }
    }

    return paths
  }
}
