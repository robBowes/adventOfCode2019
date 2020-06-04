import {
  permutor,
  amplifierSeries,
  findBestPermutation,
  phasePermutaions,
  loopingAmplifierSeries,
} from "./day7"
import { loopingProgram1 } from "./loopingProgram1"

describe("the permutor", () => {
  test("permutes nothing", () => {
    expect(permutor([])).toEqual([[]])
  })
  test("permutes one entry array", () => {
    expect(permutor([1])).toEqual([[1]])
  })
  test("permutes two entry array", () => {
    expect(permutor([1, 2])).toEqual([
      [1, 2],
      [2, 1],
    ])
  })
  test("permutes three entry array", () => {
    expect(permutor([1, 2, 3])).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ])
  })
})

const program1 = [
  3,
  15,
  3,
  16,
  1002,
  16,
  10,
  16,
  1,
  16,
  15,
  15,
  4,
  15,
  99,
  0,
  0,
]

const program2 = [
  3,
  23,
  3,
  24,
  1002,
  24,
  10,
  24,
  1002,
  23,
  -1,
  23,
  101,
  5,
  23,
  23,
  1,
  24,
  23,
  23,
  4,
  23,
  99,
  0,
  0,
]
describe("the amplifier series", () => {
  test("1", () => {
    expect(amplifierSeries(program1, [4, 3, 2, 1, 0])).toBe(43210)
  })
  test("2", () => {
    expect(amplifierSeries(program2, [0, 1, 2, 3, 4])).toBe(54321)
  })
})

describe("best permutaiton finder", () => {
  test("1", () => {
    expect(findBestPermutation(program1, phasePermutaions)).toBe(43210)
  })
  test("2", () => {
    expect(findBestPermutation(program2, phasePermutaions)).toBe(54321)
  })
})

describe("the looping amplifier", () => {
  test("1", () =>
    expect(loopingAmplifierSeries(loopingProgram1, [9, 8, 7, 6, 5])).toBe(
      139629729
    ))
})
