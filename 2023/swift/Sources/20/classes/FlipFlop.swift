import Foundation

class FlipFlop {
  let name: String
  let outputs: [String]
  var on: Bool = false

  init(name: String, outputs: [String]) {
    self.name = name
    self.outputs = outputs
  }

  func onReceivePulse(type: Int) -> [(Int, String, String)] {
    if type == Pulse.LOW {
      on.toggle()
      return outputs.map { (self.on ? Pulse.HIGH : Pulse.LOW, $0, self.name) }
    }

    return []
  }
}
