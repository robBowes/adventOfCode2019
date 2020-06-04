import { forEach, filter, reduce } from "lodash"
import { compute, asyncCompute } from "../day5/compute"
import { file } from "../helper/file"
import { parseCommaSeparatedArray } from "../helper/parseCommaSeparatedArray"
import { writeFile } from "fs"

export const permutor = (arr: number[]): number[][] => {
  if (arr.length === 0) {
    return [[]]
  }
  const o = []
  for (const key of arr) {
    const remaining = filter(arr, (el) => el !== key)
    const perms = permutor(remaining)
    for (const perm of perms) {
      o.push([key, ...perm])
    }
  }
  return o
}

export const phasePermutaions = permutor([0, 1, 2, 3, 4])
export const phasePermutaionsTwo = permutor([5, 6, 7, 8, 9])

export const amplifierSeries = (program: number[], sequence: number[]) => {
  const amplifierA = compute(program, [sequence[0], 0])[0]
  const amplifierB = compute(program, [sequence[1], amplifierA])[0]
  const amplifierC = compute(program, [sequence[2], amplifierB])[0]
  const amplifierD = compute(program, [sequence[3], amplifierC])[0]
  const amplifierE = compute(program, [sequence[4], amplifierD])[0]
  return amplifierE
}

export const loopingAmplifierSeries = (
  program: number[],
  sequence: number[]
) => {
  const amp = asyncCompute(program)
  const amplifierA = amp([sequence[0], 0])
  const aNext = amplifierA.next()
  const amplifierB = amp([sequence[1], aNext.value[0]])
  const bNext = amplifierB.next().value[0]
  const amplifierC = amp([sequence[2], bNext])
  const amplifierD = amp([sequence[3], amplifierC.next().value[0]])
  const amplifierE = amp([sequence[4], amplifierD.next().value[0]])
  const recurse = (input: IteratorResult<number[], number[]>): number => {
    if (input.done) {
      return input.value[0]
    }
    const a = amplifierA.next(input.value)
    const b = amplifierB.next(a.value)
    const c = amplifierC.next(b.value)
    const d = amplifierD.next(c.value)
    const e = amplifierD.next(d.value)
    return recurse(e)
  }
  return recurse(amplifierE.next())
}

export const findBestPermutation = (data: number[], permutations: number[][]) =>
  reduce(
    permutations,
    (acc, sequence) => {
      const signal = amplifierSeries(data, sequence)
      if (signal > acc) {
        return signal
      }
      return acc
    },
    0
  )

export const doPuzzleOne = async () => {
  try {
    const input = await file("./day7/input.txt")
    if (input) {
      const data = parseCommaSeparatedArray(input)
      console.clear()
      const result = findBestPermutation(data, phasePermutaions)
      writeFile("./day7/result.txt", result, () =>
        console.log("puzzle one complete")
      )
    }
  } catch (error) {
    console.error(error)
  }
}
