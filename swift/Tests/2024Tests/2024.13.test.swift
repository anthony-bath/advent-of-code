import Testing
@testable import AdventOfCode

struct Year2024Day13Tests {
  let day = Year2024.Day13(challengeYear: 2024)

  @Test("Day 13, Part 1") func part1() {
    #expect(day.part1() as? Int == 29438)
  }

  @Test("Day 13, Part 2") func part2() {
    #expect(day.part2() as? Int == 104_958_599_303_720)
  }
}
