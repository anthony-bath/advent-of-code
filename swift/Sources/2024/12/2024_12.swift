import Algorithms

extension Year2024 {
  struct Day12: AdventDay {
    var grid: [[String]]
    let W: Int
    let H: Int

    var regions: [Set<Geometry.Point>] = []

    init(data _: String, lines: [String]) {
      grid = lines.map { $0.map { String($0) } }
      W = grid[0].count
      H = grid.count

      var regions: [Set<Geometry.Point>] = []
      var visited: Set<Geometry.Point> = []

      for y in 0 ..< H {
        for x in 0 ..< W {
          let point = Geometry.Point(x: x, y: y)
          if visited.contains(point) {
            continue
          }

          visited.insert(point)

          var region: Set<Geometry.Point> = [point]
          var queue: [Geometry.Point] = [point]

          while !queue.isEmpty {
            let current = queue.removeFirst()

            for neighbor in current.cardinalNeighbors {
              if visited.contains(neighbor) {
                continue
              }

              if neighbor.x < 0 || neighbor.x >= W || neighbor.y < 0 || neighbor.y >= H {
                continue
              }

              if grid[neighbor.y][neighbor.x] == grid[current.y][current.x] {
                queue.append(neighbor)
                visited.insert(neighbor)
                region.insert(neighbor)
              }
            }
          }

          regions.append(region)
        }
      }

      self.regions = regions
    }

    func part1() -> Any {
      var cost = 0

      for region in regions {
        let area = region.count
        var perimeter = 0

        for point in region {
          for neighbor in point.cardinalNeighbors {
            if !region.contains(neighbor) {
              perimeter += 1
            }
          }
        }

        cost += perimeter * area
      }

      return cost
    }

    func part2() -> Any {
      0
    }
  }
}
