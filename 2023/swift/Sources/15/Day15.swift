import Algorithms

struct Day15: AdventDay {
  var data: String
  var lines: [String]

  var steps: [String] {
    lines[0].components(separatedBy: ",")
  }

  func hash(str: String) -> Int {
    str.reduce(0) { sum, letter in
      ((sum + Int(letter.unicodeScalars.first!.value)) * 17) % 256
    }
  }

  func part1() -> Any {
    steps.reduce(0) { total, step in
      total + hash(str: step)
    }
  }

  func part2() -> Any {
    var boxes = Array(repeating: [(label: String, foc: Int)](), count: 256)

    for step in steps {
      let match = step.wholeMatch(of: #/(?<label>\w+).(?<foc>\d?)/#)!.output
      let (_, label, foc) = match

      let boxNumber = hash(str: String(label))

      if foc.count == 0 {
        boxes[boxNumber].removeAll(where: { $0.label == String(label) })
      } else {
        let lens = (label: String(label), foc: Int(foc)!)
        let index = boxes[boxNumber].firstIndex(where: { $0.label == String(label) })

        if let index = index {
          boxes[boxNumber][index] = lens
        } else {
          boxes[boxNumber].append(lens)
        }
      }
    }

    var power = 0

    for boxNumber in 0 ... 255 {
      var position = 1

      for (_, foc) in boxes[boxNumber] {
        power += ((boxNumber + 1) * position * foc)
        position += 1
      }
    }

    return power
  }
}
