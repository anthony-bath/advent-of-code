import Foundation

let fileURL = URL(fileURLWithPath: "2023/05/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let seeds = lines[0].matches(of: #/\d+/#).map { Int($0.output)! }
var maps: [String: [(min: Int, max: Int, offset: Int)]] = [:]

var currentSource = ""

for line in lines.suffix(from: 2) {
  guard line.count > 0 else { continue }

  let label = try? #/(?<source>\w+)-to-(?<destination>\w+)/#.firstMatch(in: line)

  if let label = label {
    currentSource = String(label.output.source)
  } else {
    let data = try? #/(?<drs>\d+)\s(?<srs>\d+)\s(?<len>\d+)/#.firstMatch(in: line)

    if let data = data {
      let drs = Int(data.output.drs)!
      let srs = Int(data.output.srs)!
      let len = Int(data.output.len)!

      let newMap = (min: srs, max: srs + len - 1, offset: drs - srs)

      if maps.keys.contains(currentSource) {
        maps[currentSource]!.append(newMap)
      } else {
        maps[currentSource] = [newMap]
      }
    }
  }
}

let path = ["seed", "soil", "fertilizer", "water", "light", "temperature", "humidity"]

func find(value: Int, index: Int) -> Int {
  let sourceMaps = maps[path[index]]!
  let targetMap = sourceMaps.first(where: { value >= $0.min && value <= $0.max })

  var nextValue: Int?

  if let targetMap = targetMap {
    nextValue = value + targetMap.offset
  } else {
    nextValue = value
  }

  if index == path.count - 1 {
    return nextValue!
  }

  return find(value: nextValue!, index: index + 1)
}

let result = seeds.map { find(value: $0, index: 0) }.sorted()[0]

print("2023 Day 5 Part 1: \(result)")
