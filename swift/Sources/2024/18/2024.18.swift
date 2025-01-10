import Algorithms

extension Year2024 {
  struct Day18: AdventDay {
    var bytes: [Geometry.Point]
    let W = 70
    let H = 70

    init(data _: String, lines: [String]) {
      var bytes: [Geometry.Point] = []

      for line in lines {
        let point = Geometry.Point(
          x: Int(line.split(separator: ",")[0])!,
          y: Int(line.split(separator: ",")[1])!
        )

        bytes.append(point)
      }

      self.bytes = bytes
    }

    func part1() -> Any {
      let included = bytes[0 ... 1023]
      let start = Geometry.Point(x: 0, y: 0)
      let goal = Geometry.Point(x: W, y: H)
      var queue: [Item] = [Item(location: start, distance: 0)]
      var visited: Set<Geometry.Point> = [start]

      while !queue.isEmpty {
        let item = queue.removeFirst()

        if item.location == goal {
          return item.distance
        }

        for neighbor in item.location.cardinalNeighbors {
          guard neighbor.x >= 0 && neighbor.x <= W && neighbor.y >= 0 && neighbor.y <= H else {
            continue
          }

          if !visited.contains(neighbor) && !included.contains(neighbor) {
            visited.insert(neighbor)
            queue.append(Item(location: neighbor, distance: item.distance + 1))
          }
        }
      }

      fatalError("No Path Found")
    }

    func part2() -> Any {
      var removeCount = 0
      let end = Geometry.Point(x: W, y: H)
      let start = Geometry.Point(x: 0, y: 0)
      var walls = Set(bytes)

      while removeCount < bytes.count {
        var queue = [end]
        var visited: Set<Geometry.Point> = Set([end])

        while !queue.isEmpty {
          let location = queue.removeFirst()

          for neighbor in location.cardinalNeighbors {
            guard neighbor.x >= 0 && neighbor.x <= W && neighbor.y >= 0 && neighbor.y <= H else {
              continue
            }

            guard !walls.contains(neighbor) else {
              continue
            }

            if !visited.contains(neighbor) {
              visited.insert(neighbor)
              queue.append(neighbor)
            }
          }
        }

        if visited.contains(start) {
          let point = bytes[bytes.count - removeCount]
          return "\(point.x),\(point.y)"
        }

        walls.remove(bytes[bytes.count - removeCount - 1])
        removeCount += 1
      }

      fatalError("No Solution Found")
    }

    func part2_bruteForce() -> Any {
      for extra in 1 ... bytes.count - 1024 {
        let included = bytes[0 ... 1023 + extra]
        let start = Geometry.Point(x: 0, y: 0)
        let goal = Geometry.Point(x: W, y: H)
        var queue: [Item] = [Item(location: start, distance: 0)]
        var visited: Set<Geometry.Point> = [start]
        var pathFound = false

        while !queue.isEmpty {
          let item = queue.removeFirst()

          if item.location == goal {
            pathFound = true
            break
          }

          for neighbor in item.location.cardinalNeighbors {
            guard neighbor.x >= 0 && neighbor.x <= W && neighbor.y >= 0 && neighbor.y <= H else {
              continue
            }

            if !visited.contains(neighbor) && !included.contains(neighbor) {
              visited.insert(neighbor)
              queue.append(Item(location: neighbor, distance: item.distance + 1))
            }
          }
        }

        if !pathFound {
          return bytes[1023 + extra]
        }
      }

      fatalError("No Solution Found")
    }

    struct Item {
      let location: Geometry.Point
      let distance: Int
    }
  }
}
