import Testing
@testable import AdventOfCode

struct Year2024Day21Tests {
  let day = Year2024.Day21(challengeYear: 2024)

  @Test("Day 21, Part 1") func part1() {
    #expect(day.part1() as? Int == 132_532)
  }

  @Test("Day 21, Part 2") func part2() {
    #expect(day.part2() as? Int == 165_644_591_859_332)
  }
}
