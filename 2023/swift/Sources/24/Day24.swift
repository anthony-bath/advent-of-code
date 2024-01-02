import Algorithms
import Foundation

struct Day24: AdventDay {
  var data: String
  var lines: [String]

  func part1() -> Any {
    let MIN_POS = Double(200_000_000_000_000)
    let MAX_POS = Double(400_000_000_000_000)

    let hailstones = lines.map { $0.matches(of: #/-?\d+/#).map { Double(Int($0.output)!) } }
    var count = 0

    for i in stride(from: 0, to: hailstones.count - 1, by: 1) {
      for j in stride(from: i + 1, to: hailstones.count, by: 1) {
        let h1 = hailstones[i]
        let h2 = hailstones[j]

        let (h1x, h1y, h1vx, h1vy) = (h1[0], h1[1], h1[3], h1[4])
        let (h2x, h2y, h2vx, h2vy) = (h2[0], h2[1], h2[3], h2[4])

        // y = mx + b
        let h1m = h1vy / h1vx
        let h1b = h1y - h1m * h1x
        let h2m = h2vy / h2vx
        let h2b = h2y - h2m * h2x

        // Find intersection of the two lines
        let x = (h2b - h1b) / (h1m - h2m)
        let y = h1m * x + h1b

        // Check if intersection is within bounds
        if x >= MIN_POS && x <= MAX_POS && y >= MIN_POS && y <= MAX_POS {
          // Time to reach intersection
          let h1t = (x - h1x) / h1vx
          let h2t = (x - h2x) / h2vx

          if h1t >= 0 && h2t >= 0 {
            count += 1
          }
        }
      }
    }

    return count
  }

  func part2() -> Any {
    0
  }
}
