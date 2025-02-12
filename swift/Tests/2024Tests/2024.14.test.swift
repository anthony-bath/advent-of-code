import Testing
@testable import AdventOfCode

struct Year2024Day14Tests {
  let day = Year2024.Day14(challengeYear: 2024)

  @Test("Day 14, Part 1") func part1() {
    #expect(day.part1() as? Int == 217_328_832)
  }

  @Test("Day 14, Part 2") func part2() {
    #expect(day.part2() as? Int == 7412)
  }
}
