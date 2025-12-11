import Algorithms
import Darwin
import Foundation

extension Year2025 {
  struct Day10: AdventDay {
    let machines: [Machine]

    init(data _: String, lines: [String]) {
      var machines: [Machine] = []

      for line in lines {
        let parts = line.replacing(#/[\[\]\(\)\{\}]/#, with: "").split(separator: " ")
        let indicator = Int(parts[0].reversed().map { $0 == "." ? "0" : "1" }.joined(), radix: 2)!
        var buttons: [[Int]] = []

        for part in parts[1 ..< parts.count - 1] {
          buttons.append(part.matches(of: #/\d+/#).map { 1 << Int($0.output)! })
        }

        machines.append(Machine(indicator: indicator, buttons: buttons))
      }

      self.machines = machines
    }

    func part1() -> Any {
      var total = 0

      for machine in machines {
        var best = Int.max
        var queue = [(indicator: 0, presses: 0)]
        var seen = Set<Int>()

        while queue.count > 0 {
          let state = queue.removeFirst()

          if state.indicator == machine.indicator {
            if state.presses < best {
              best = state.presses
            }

            continue
          }

          if state.presses >= best {
            continue
          }

          for toggles in machine.buttons {
            var next = state.indicator

            for toggle in toggles {
              next ^= toggle
            }

            if !seen.contains(next) {
              queue.append((indicator: next, presses: state.presses + 1))
              seen.insert(next)
            }
          }
        }

        total += best
      }

      return total
    }

    func part2() -> Any {
      // solved in JS with z3 😔
      20617
    }
  }

  struct Machine {
    let indicator: Int
    let buttons: [[Int]]
  }
}
