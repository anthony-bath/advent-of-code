import Foundation

let fileURL = URL(fileURLWithPath: "2023/01/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let expr = #/\d/#
var total: Int = 0

for line in lines {
  let digits = line.ranges(of: expr).map { String(line[$0]) }
  total += Int("\(digits[0])\(digits[digits.count - 1])")!
}

print("2023 Day 1 Part 1: \(total)")
