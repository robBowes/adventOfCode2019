import { parseCommaSeparatedArray } from "../helper/parseCommaSeparatedArray"
import { file } from "../helper/file"
import { OpCode } from "../day2"
import { head, split, toString } from "lodash"
import { AssertionError } from "assert"

export const compute = (
  data: number[],
  input: number[],
  position: number = 0,
  output: number[] = []
): number[] => {
  const opCode = data[position]
  if (!opCode) throw new Error("no op code")
  const [instruction, ...modes] = processOpCode(opCode)
  const params = [data[position + 1], data[position + 2], data[position + 3]]

  const getInput = getInput_(data, modes, params)

  if (instruction == 1) {
    const input1 = getInput(0)
    const input2 = getInput(1)
    const result = input1 + input2
    const newData = [...data]
    newData[params[2]] = result
    return compute(newData, input, position + 4, output)
  } else if (instruction === 2) {
    const input1 = getInput(0)
    const input2 = getInput(1)
    const result = input1 * input2
    const newData = [...data]
    newData[params[2]] = result
    return compute(newData, input, position + 4, output)
  } else if (instruction === 3) {
    const newData = [...data]
    const [head, ...rest] = input
    newData[params[0]] = head
    return compute(newData, rest, position + 2, output)
  } else if (instruction === 4) {
    return compute(data, input, position + 2, [...output, data[params[0]]])
  } else if (instruction === 5) {
    const cond = getInput(0)
    const newLoc = getInput(1)
    return compute(data, input, cond ? newLoc : position + 3, output)
  } else if (instruction === 6) {
    const cond = getInput(0)
    const newLoc = getInput(1)
    const newPos = !cond ? newLoc : position + 3
    return compute(data, input, newPos, output)
  } else if (instruction === 7) {
    const first = getInput(0)
    const second = getInput(1)
    const result = first < second ? 1 : 0
    const newData = [...data]
    newData[params[2]] = result
    return compute(newData, input, position + 4, output)
  } else if (instruction === 8) {
    const first = getInput(0)
    const second = getInput(1)
    const result = first === second ? 1 : 0
    const newData = [...data]
    newData[params[2]] = result
    return compute(newData, input, position + 4, output)
  } else if (instruction === 99) {
    return output
  }
  throw new Error("invalid instruction")
}

const isNumber = (condition: any, m?: string): condition is number => {
  return typeof condition === "number"
}

const getInput_ = (data: number[], modes: number[], params: number[]) => (
  pos: number
): number => {
  if (!modes[pos]) {
    return data[params[pos]]
  }
  return params[pos]
}

const processOpCode = (code: number) => {
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
