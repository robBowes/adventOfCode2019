import { parseCommaSeparatedArray } from "../helper/parseCommaSeparatedArray"
import { file } from "../helper/file"
import { OpCode } from "../day2"
import { head, split, toString } from "lodash"
import { AssertionError } from "assert"
import { compute } from "./compute"

const isNumber = (condition: any, m?: string): condition is number => {
  return typeof condition === "number"
}

export const getInput_ = (
  data: number[],
  modes: number[],
  params: number[]
) => (pos: number): number => {
  if (!modes[pos]) {
    return data[params[pos]]
  }
  return params[pos]
}

export const processOpCode = (code: number) => {
  const instruction = code % 100
  const mode1 = ((code - instruction) / 100) % 10
  const mode2 = Math.floor(code / 1000)
  return [instruction, mode1, mode2]
}

export const doPuzzleOne = async () => {
  try {
    const input = await file("./day5/input.txt")
    if (input) {
      const data = parseCommaSeparatedArray(input)
      // console.log(data)
      console.clear()
      console.log(compute(data, [1]))
    }
  } catch (error) {
    console.error(error)
  }
}

export const doPuzzleTwo = async () => {
  try {
    const input = await file("./day5/input.txt")
    if (input) {
      const data = parseCommaSeparatedArray(input)
      // console.log(data)
      console.clear()
      console.log(compute(data, [5]))
    }
  } catch (error) {
    console.error(error)
  }
}
