extension Year2024 {
  class Operator {
    var position: Geometry.Point
    let child: Operator?
    let keypad: Keypad

    init(keypad: Keypad, position: Geometry.Point, child: Operator?) {
      self.keypad = keypad
      self.position = position
      self.child = child
    }

    func input(_ value: String) -> String {
      var inputPaths: [String] = []

      for char in value {
        let keyPaths = keypad.paths(from: position, to: char)

        if inputPaths.isEmpty {
          inputPaths = keyPaths.map { "\(String($0))A" }
        } else {
          var newInputPaths: [String] = []

          for path in inputPaths {
            for keyPath in keyPaths {
              newInputPaths.append("\(path)\(String(keyPath))A")
            }
          }

          inputPaths = newInputPaths
        }

        position = keypad.map[char]!
      }

      if let child = child {
        var allInputPaths: [String] = []

        for inputPath in inputPaths {
          allInputPaths.append(child.input(inputPath))
        }

        return allInputPaths.sorted { $0.count < $1.count }.first!
      }

      return inputPaths.sorted { $0.count < $1.count }.first!
    }
  }
}
