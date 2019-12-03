import { calculateFuelNeeded, recursiveCalculateFuel } from "./day1"

describe("Puzzle 1: ", () => {
  test("The weight calculation", () => {
    expect(calculateFuelNeeded(12)).toBe(2)
    expect(calculateFuelNeeded(14)).toBe(2)
    expect(calculateFuelNeeded(1969)).toBe(654)
    expect(calculateFuelNeeded(100756)).toBe(33583)
  })
})

describe("Puzzle 2:", () => {
  test("The recursive weight calculation", () => {
    expect(recursiveCalculateFuel(12)).toBe(2)
    expect(recursiveCalculateFuel(14)).toBe(2)
    expect(recursiveCalculateFuel(1969)).toBe(966)
    expect(recursiveCalculateFuel(100756)).toBe(50346)
  })
})
