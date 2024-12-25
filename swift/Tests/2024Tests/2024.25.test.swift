import XCTest
@testable import AdventOfCode

final class Year2024Day25Tests: XCTestCase {
  let day = Year2024.Day25(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 3021)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 0)
  }
}
