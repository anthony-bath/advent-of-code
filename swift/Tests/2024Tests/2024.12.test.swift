import Testing
@testable import AdventOfCode

struct Year2024Day12Tests {
  let day = Year2024.Day12(challengeYear: 2024)

  @Test("Day 12, Part 1") func part1() {
    #expect(day.part1() as? Int == 1_461_806)
  }

  @Test("Day 12, Part 2") func part2() {
    #expect(day.part2() as? Int == 887_932)
  }
}
