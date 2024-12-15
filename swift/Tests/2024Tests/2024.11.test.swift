import XCTest
@testable import AdventOfCode

final class Year2024Day11Tests: XCTestCase {
  let day = Year2024.Day11(challengeYear: 2024)

  func testPart1() async throws {
    XCTAssertEqual(day.part1() as? Int, 185_205)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 0)
  }
}
