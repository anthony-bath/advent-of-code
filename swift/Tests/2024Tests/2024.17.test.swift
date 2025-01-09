import XCTest
@testable import AdventOfCode

final class Year2024Day17Tests: XCTestCase {
  let day = Year2024.Day17(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? String, "4,0,4,7,1,2,7,1,6")
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 202_322_348_616_234)
  }
}
