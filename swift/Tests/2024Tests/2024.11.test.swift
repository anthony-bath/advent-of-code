import Testing
@testable import AdventOfCode

struct Year2024Day11Tests {
  let day = Year2024.Day11(challengeYear: 2024)

  @Test("Day 11, Part 1") func part1() {
    #expect(day.part1() as? Int == 185_205)
  }

  @Test("Day 11, Part 2") func part2() {
    #expect(day.part2() as? Int == 221_280_540_398_419)
  }
}
