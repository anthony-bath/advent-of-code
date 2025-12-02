import Algorithms
import Foundation

extension Year2025 {
  struct Day01: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      var position = 50
      var password = 0

      lines.forEach {
        let dir = String($0.prefix(1))
        let distance = Int(String($0.dropFirst(1)))! % 100
        let turns = dir == "L" ? 100 - distance : distance

        position = (position + turns) % 100

        if position == 0 {
          password += 1
        }
      }

      return password
    }

    func part2() -> Any {
      var position = 50
      var password = 0

      lines.forEach {
        let dir = String($0.prefix(1))
        let distance = Int(String($0.dropFirst(1)))!

        if distance >= 100 {
          // Full Rotations
          password += (distance / 100)
        }

        let remaining = distance % 100

        if dir == "L" {
          let initial = position
          let next = (position - remaining + 100) % 100

          if position - remaining < 0 && initial != 0 {
            password += 1
          } else if next == 0 && position != 0 && remaining > 0 {
            password += 1
          }

          position = next
        } else {
          if position + remaining > 99 {
            password += 1
          }

          position = (position + remaining) % 100
        }
      }

      return password
    }
  }
}
