
import Testing
@testable import AdventOfCode

struct Year2024Day01Tests {
  let day = Year2024.Day01(challengeYear: 2024)

  @Test("Day 1, Part 1") func part1() {
    #expect(day.part1() as? Int == 2_176_849)
  }

  @Test("Day 1, Part 2") func part2() {
    #expect(day.part2() as? Int == 23_384_288)
  }
}
