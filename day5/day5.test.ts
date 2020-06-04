import { compute } from "./compute"

describe("the intcode compluter", () => {
  test("less than eight position", () => {
    const lessThanEight = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]
    expect(compute(lessThanEight, [7])[0]).toBe(1)
    expect(compute(lessThanEight, [9])[0]).toBe(0)
    expect(compute(lessThanEight, [0])[0]).toBe(1)
  })
  test("less than eight immediate", () => {
    const lessThanEight = [3, 3, 1107, -1, 8, 3, 4, 3, 99]
    expect(compute(lessThanEight, [7])[0]).toBe(1)
    expect(compute(lessThanEight, [9])[0]).toBe(0)
    expect(compute(lessThanEight, [0])[0]).toBe(1)
  })
  test("equal to eight position", () => {
    const lessThanEight = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]
    expect(compute(lessThanEight, [7])[0]).toBe(0)
    expect(compute(lessThanEight, [9])[0]).toBe(0)
    expect(compute(lessThanEight, [8])[0]).toBe(1)
  })
  test("equal to eight immediate", () => {
    const lessThanEight = [3, 3, 1108, -1, 8, 3, 4, 3, 99]
    expect(compute(lessThanEight, [7])[0]).toBe(0)
    expect(compute(lessThanEight, [9])[0]).toBe(0)
    expect(compute(lessThanEight, [8])[0]).toBe(1)
  })
  test("is non zero", () => {
    const isZero = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]
    expect(compute(isZero, [0])[0]).toBe(0)
    expect(compute(isZero, [1])[0]).toBe(1)
  })
})
