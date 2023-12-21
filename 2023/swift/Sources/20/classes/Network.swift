import Foundation

class Network {
  var flipflops: [String: FlipFlop] = [:]
  var conjunctions: [String: Conjunction] = [:]
  var broadcaster: Broadcaster

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
        flipflops[name] = FlipFlop(name: name, outputs: outputs)
      } else {
        let name = String(input.dropFirst())
        conjunctions[name] = Conjunction(name: name, outputs: outputs)
      }
    }

    broadcaster = Broadcaster(outputs: broadcasterOutputs)

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
