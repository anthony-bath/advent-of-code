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
      var cost = 0

      for region in regions {
        let area = region.count
        var cornersCount = 0

        // # of Corners = # of Sides
        // A corner is formed if a diagonal neighbor is not in the region and the
        // two adjacent neighbors are both in the region or both not in the region.
        // The exception to this though is like this:
        //    AAAAAA
        //    AAABBA
        //    ABBAAA
        //    AAAAAA
        // In this case, the corners of th left top B and bottom right B would not
        // be detected with the above logic, so need to check when the diagonal
        // neightbor IS in the region, if both of the adjacent neighbors are not in the region
        // then it is also a corner.

        for point in region.sorted(by: { $0.x == $1.x ? $0.y < $1.y : $0.x < $1.x }) {
          if !region.contains(point.topLeftNeighbor) {
            if region.contains(point.topNeighbor) == region.contains(point.leftNeighbor) {
              cornersCount += 1
            }
          } else {
            if !region.contains(point.leftNeighbor) && !region.contains(point.topNeighbor) {
              cornersCount += 1
            }
          }

          if !region.contains(point.topRightNeighbor) {
            if region.contains(point.topNeighbor) == region.contains(point.rightNeighbor) {
              cornersCount += 1
            }
          } else {
            if !region.contains(point.rightNeighbor) && !region.contains(point.topNeighbor) {
              cornersCount += 1
            }
          }

          if !region.contains(point.bottomLeftNeighbor) {
            if region.contains(point.bottomNeighbor) == region.contains(point.leftNeighbor) {
              cornersCount += 1
            }
          } else {
            if !region.contains(point.leftNeighbor) && !region.contains(point.bottomNeighbor) {
              cornersCount += 1
            }
          }

          if !region.contains(point.bottomRightNeighbor) {
            if region.contains(point.bottomNeighbor) == region.contains(point.rightNeighbor) {
              cornersCount += 1
            }
          } else {
            if !region.contains(point.rightNeighbor) && !region.contains(point.bottomNeighbor) {
              cornersCount += 1
            }
          }
        }

        cost += (area * cornersCount)
      }

      return cost
    }
  }
}
