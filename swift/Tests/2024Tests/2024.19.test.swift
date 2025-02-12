import Testing
@testable import AdventOfCode

struct Year2024Day19Tests {
  let day = Year2024.Day19(challengeYear: 2024)

  @Test("Day 19, Part 1") func part1() {
    #expect(day.part1() as? Int == 347)
  }

  @Test("Day 19, Part 2") func part2() {
    #expect(day.part2() as? Int == 919_219_286_602_165)
  }
}
