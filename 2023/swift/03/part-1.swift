import Foundation

let fileURL = URL(fileURLWithPath: "2023/03/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let H = lines.count
let W = lines[0].count

let partExpr = #/\d+/#
let symbol = #/[^0-9\.]/#

func isSymbol(_ position: [Int]) -> Bool {
  let x = position[0]
  let y = position[1]

  guard y >= 0 && y < H && x >= 0 && x < W else { return false }

  let line = lines[y]
  let char = line[line.index(line.startIndex, offsetBy: x)]
  let match = try? symbol.firstMatch(in: String(char))

  return match != nil
}

func getPositions(_ x: Int, _ y: Int, _ len: Int) -> [[Int]] {
  var positions = [
    [x - 1, y],
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + len, y],
    [x + len, y - 1],
    [x + len, y + 1],
  ]

  for i in x ..< (x + len) {
    positions.append([i, y - 1])
    positions.append([i, y + 1])
  }

  return positions
}

var sum = 0

for y in 0 ..< lines.count {
  let matches = lines[y].matches(of: partExpr)

  for match in matches {
    let x = lines[y].distance(from: lines[y].startIndex, to: match.startIndex)
    let part = Int(match.output)!

    let positions = getPositions(x, y, match.output.count)

    for position in positions {
      if isSymbol(position) {
        sum += part
        break
      }
    }
  }
}

print("2023 Day 3 Part 1: \(sum)")
