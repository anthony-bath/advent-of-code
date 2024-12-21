import XCTest
@testable import AdventOfCode

final class Year2024Day13Tests: XCTestCase {
  let day = Year2024.Day13(challengeYear: 2024)

  func testPart1() async throws {
    XCTAssertEqual(day.part1() as? Int, 29438)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 104_958_599_303_720)
  }
}
