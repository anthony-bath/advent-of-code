
import XCTest
@testable import AdventOfCode

final class Year2024Day01Tests: XCTestCase {
  func testPart1() async throws {
    let day = Year2024.Day01(challengeYear: 2024)
    XCTAssertEqual(day.part1() as? Int, 2_176_849)
  }

  func testPart2() {
    let day = Year2024.Day01(challengeYear: 2024)
    XCTAssertEqual(day.part2() as? Int, 23_384_288)
  }
}
