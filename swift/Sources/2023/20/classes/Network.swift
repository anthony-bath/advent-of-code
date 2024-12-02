import Foundation

extension Year2023 {
  class Network {
    var flipflops: [String: Year2023.FlipFlop] = [:]
    var conjunctions: [String: Year2023.Conjunction] = [:]
    var broadcaster: Year2023.Broadcaster

    init(lines: [String]) {
      var broadcasterOutputs: [String] = []

      for line in lines {
        let parts = line.components(separatedBy: " -> ")
        let outputs = parts[1].components(separatedBy: ", ")
        let input = parts[0]

        if input == "broadcaster" {
          broadcasterOutputs = outputs
        } else if line.first == "%" {
          let name = String(input.dropFirst())
          flipflops[name] = Year2023.FlipFlop(name: name, outputs: outputs)
        } else {
          let name = String(input.dropFirst())
          conjunctions[name] = Year2023.Conjunction(name: name, outputs: outputs)
        }
      }

      broadcaster = Year2023.Broadcaster(outputs: broadcasterOutputs)

      for flipflop in flipflops.values {
        for output in flipflop.outputs {
          if conjunctions.keys.contains(output) {
            conjunctions[output]!.addInput(input: flipflop.name)
          }
        }
      }

      for conjunction in conjunctions.values {
        for output in conjunction.outputs {
          if conjunctions.keys.contains(output) {
            conjunctions[output]!.addInput(input: conjunction.name)
          }
        }
      }
    }
  }
}
