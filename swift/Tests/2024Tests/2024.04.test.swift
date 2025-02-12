
import Testing
@testable import AdventOfCode

struct Year2024Day04Tests {
  let day = Year2024.Day04(challengeYear: 2024)

  @Test("Day 4, Part 1") func part1() {
    #expect(day.part1() as? Int == 2500)
  }

  @Test("Day 4, Part 2") func part2() {
    #expect(day.part2() as? Int == 1933)
  }
}
