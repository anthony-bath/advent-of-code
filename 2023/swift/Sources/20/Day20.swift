import Algorithms
import Foundation

struct Day20: AdventDay {
  var data: String
  var lines: [String]

  func part1() -> Any {
    let network = Network(lines: lines)
    var (low, high) = (1000, 0)

    for _ in 1 ... 1000 {
      var queue = [(Pulse.LOW, "broadcaster", "button")]

      while queue.count > 0 {
        let (type, target, origin) = queue.removeFirst()

        var pulses: [(Int, String, String)] = []

        if target == "broadcaster" {
          pulses = network.broadcaster.onReceivePulse(type: type)
        } else if network.flipflops.keys.contains(target) {
          pulses = network.flipflops[target]!.onReceivePulse(type: type)
        } else if network.conjunctions.keys.contains(target) {
          pulses = network.conjunctions[target]!.onReceivePulse(type: type, origin: origin)
        }

        guard pulses.count > 0 else { continue }

        queue.append(contentsOf: pulses)

        if pulses.first!.0 == Pulse.LOW {
          low += pulses.count
        } else {
          high += pulses.count
        }
      }
    }

    return low * high
  }

  func part2() -> Any {
    let network = Network(lines: lines)
    var rxInput: String?

    for conjunction in network.conjunctions.values {
      if conjunction.outputs.contains("rx") {
        rxInput = conjunction.name
      }
    }

    guard let rxInput = rxInput else { fatalError("No rx input found") }

    var rxInputInputs: [String] = []

    for conjunction in network.conjunctions.values {
      if conjunction.outputs.contains(rxInput) {
        rxInputInputs.append(conjunction.name)
      }
    }

    guard rxInputInputs.count > 0 else { fatalError("No rx input inputs found") }

    var cycles: [Int] = []
    var presses = 0

    while rxInputInputs.count > 0 {
      presses += 1

      var queue = [(Pulse.LOW, "broadcaster", "button")]

      while queue.count > 0 {
        let (type, target, origin) = queue.removeFirst()

        var pulses: [(Int, String, String)] = []

        if target == "broadcaster" {
          pulses = network.broadcaster.onReceivePulse(type: type)
        } else if network.flipflops.keys.contains(target) {
          pulses = network.flipflops[target]!.onReceivePulse(type: type)
        } else if network.conjunctions.keys.contains(target) {
          pulses = network.conjunctions[target]!.onReceivePulse(type: type, origin: origin)
        }

        guard pulses.count > 0 else { continue }

        queue.append(contentsOf: pulses)

        for pulse in pulses {
          let (type, target, _) = pulse

          if rxInputInputs.contains(target) && type == Pulse.LOW {
            cycles.append(presses)
            rxInputInputs.removeAll { $0 == target }
          }
        }
      }
    }

    return Math.lcm(cycles)
  }
}
