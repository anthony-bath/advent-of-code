import XCTest
@testable import AdventOfCode

final class Year2024Day19Tests: XCTestCase {
  let day = Year2024.Day19(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 347)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 919_219_286_602_165)
  }
}
