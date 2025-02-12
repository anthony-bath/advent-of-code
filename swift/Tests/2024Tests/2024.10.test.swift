import Testing
@testable import AdventOfCode

struct Year2024Day10Tests {
  let day = Year2024.Day10(challengeYear: 2024)

  @Test("Day 10, Part 1") func part1() {
    #expect(day.part1() as? Int == 582)
  }

  @Test("Day 10, Part 2") func part2() {
    #expect(day.part2() as? Int == 1302)
  }
}
