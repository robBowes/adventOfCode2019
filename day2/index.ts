import { promises, readSync, writeFile } from "fs"
import { reduce, tail } from "lodash"
import { assert } from "console"
import { file } from "../helper/file"
import { parseCommaSeparatedArray } from "../helper/parseCommaSeparatedArray"

export type OpCode = 1 | 2 | 99

type Operation = [OpCode, number, number, number]

export const processData = (data: number[], opIndex: number): number[] => {
  const opCodes = generateInstructions(data)
  const currentOp = opCodes[opIndex]
  const opCode = currentOp[0]
  // assert(opCode === 1 || opCode === 2 || opCode === 99, "Bad opcode", {
  //   opCode,
  //   opIndex,
  //   currentOp,
  // })
  if (opCode === 99) {
    return data
  }
  const firstPostion = currentOp[1]
  const secondPosition = currentOp[2]
  const finalPostion = currentOp[3]

  const firstValue = data[firstPostion]
  const secondValue = data[secondPosition]

  const finalValue = processOperation(opCode, firstValue, secondValue)

  data[finalPostion] = finalValue

  return processData(data, ++opIndex)
}

const processOperation = (code: number, first: number, second: number) => {
  // if (code !== 1 && code !== 2) {
  //   throw new Error("bad op code: " + code)
  // }
  if (code === 1) {
    return first + second
  }
  return first * second
}

const generateInstructions = (numArr: number[]) =>
  reduce(
    numArr,
    (acc, el, i) => {
      const set = Math.floor(i / 4)
      if (!acc[set]) {
        acc[set] = [1, 0, 0, 0]
      }
      const position = i % 4
      acc[set][position] = el
      return acc
    },
    [] as Operation[]
  )

export const write = (day: number) => (puzzle: number, data: string | number) =>
  writeFile(`./day${day}/result${puzzle}.txt`, data, () => {})

export const doPuzzleOne = async () => {
  try {
    const input = await file("./day2/input.txt")
    if (input) {
      const data = parseCommaSeparatedArray(input)
      const newData = ((d) => {
        d[1] = 12
        d[2] = 2
        return d
      })(data)
      const output = processData(newData, 0)
      write(output[0])
    }
  } catch (error) {}
}

export const calculateAnswer = (n: number, v: number) => 100 * n + v

const newData = (data: number[], n: number, m: number) => {
  const ret = [...data]
  ret[1] = n
  ret[2] = m
  return ret
}

const findNumber = (
  data: number[],
  n: number,
  v: number
): { noun: number; answer: number; verb: number } => {
  const output = processData(newData(data, n, v), 0)
  if (output[0] === 19690720) {
    return { answer: calculateAnswer(n, v), noun: n, verb: v }
  }
  if (n > 99) {
    return findNumber(data, 0, v + 1)
  }
  if (v > 99) throw new Error("out of bounds")
  return findNumber(data, n + 1, v)
}

export const doPuzzleTwo = async () => {
  try {
    const input = await file("./day2/input.txt")
    if (!input) throw new Error("no input")
    const data = parseCommaSeparatedArray(input)
    const output = findNumber(data, 0, 0)
    write(2)(
      2,
      `Answer: ${output.answer} \nNoun: ${output.noun}\nVerb:${output.verb}`
    )
  } catch (error) {
    console.error(error)
  }
}
