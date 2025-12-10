import Testing
@testable import AdventOfCode

struct Year2025Day09Tests {
  let day = Year2025.Day09(challengeYear: 2025)

  @Test("Day 9, Part 1") func part1() {
    #expect(day.part1() as? Int == 4_752_484_112)
  }

  @Test("Day 9, Part 2") func part2() {
    #expect(day.part2() as? Int == 1_465_767_840)
  }
}
