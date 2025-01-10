import XCTest
@testable import AdventOfCode

final class Year2024Day18Tests: XCTestCase {
  let day = Year2024.Day18(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 334)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? String, "20,12")
  }
}
