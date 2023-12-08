import Foundation

let fileURL = URL(fileURLWithPath: "2023/05/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let seedData = lines[0].matches(of: #/\d+/#).map { Int($0.output)! }

var seedRanges: [(min: Int, max: Int)] = []

for i in stride(from: 1, through: seedData.count, by: 2) {
  seedRanges.append((min: seedData[i - 1], max: seedData[i - 1] + seedData[i] - 1))
}

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

func getRanges(ranges: [(min: Int, max: Int)], index: Int) -> [(min: Int, max: Int)] {
  let sourceMaps = maps[path[index]]!
  var mappedRanges: [(min: Int, max: Int)] = []

  for (min, max) in ranges {
    var intersects: [(min: Int, max: Int, offset: Int, high: Bool, low: Bool)] = []

    for map in sourceMaps {
      if min >= map.min, max <= map.max {
        intersects.append((min: map.min, max: map.max, offset: map.offset, high: false, low: false))
      } else if min >= map.min, min <= map.max, max > map.max {
        intersects.append((min: map.min, max: map.max, offset: map.offset, high: true, low: false))
      } else if min < map.min, max >= map.min, max <= map.max {
        intersects.append((min: map.min, max: map.max, offset: map.offset, high: false, low: true))
      }
    }

    if intersects.count == 0 {
      mappedRanges.append((min: min, max: max))
      continue
    }

    var newRanges: [(min: Int, max: Int)] = []

    for intersect in intersects {
      if intersect.high {
        newRanges.append((min: min + intersect.offset, max: intersect.max + intersect.offset))

        if intersects.count == 1 {
          newRanges.append((min: intersect.max + 1, max: max))
        }
      } else if intersect.low {
        newRanges.append((min: intersect.min + intersect.offset, max: max + intersect.offset))

        if intersects.count == 1 {
          newRanges.append((min: min, max: intersect.min - 1))
        }
      } else {
        newRanges.append((min: min + intersect.offset, max: max + intersect.offset))
      }
    }

    mappedRanges.append(contentsOf: newRanges)
  }

  if index == path.count - 1 {
    return mappedRanges
  }

  return getRanges(ranges: mappedRanges, index: index + 1)
}

let result = getRanges(ranges: seedRanges, index: 0).sorted(by: { $0.min < $1.min })[0].min

print("2023 Day 5 Part 2: \(result)")
