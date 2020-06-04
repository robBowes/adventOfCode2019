import { processOpCode, getInput_ } from "./day5"

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
export const asyncCompute = (data: number[]) =>
  function* compute(
    input: number[],
    position: number = 0
  ): Generator<number[], any, number[]> {
    const opCode = data[position]
    console.log(input)
    if (!opCode) {
      throw new Error()
    }
    const [instruction, ...modes] = processOpCode(opCode)
    const params = [data[position + 1], data[position + 2], data[position + 3]]
    const getInput = getInput_(data, modes, params)
    if (instruction == 1) {
      const input1 = getInput(0)
      const input2 = getInput(1)
      const result = input1 + input2
      const newData = [...data]
      newData[params[2]] = result
      return compute(input, position + 4)
    } else if (instruction === 2) {
      const input1 = getInput(0)
      const input2 = getInput(1)
      const result = input1 * input2
      const newData = [...data]
      newData[params[2]] = result
      return compute(input, position + 4)
    } else if (instruction === 3) {
      const newData = [...data]
      const [head, ...rest] = input
      newData[params[0]] = head
      return compute(rest, position + 2)
    } else if (instruction === 4) {
      const newInput = yield [data[params[0]]]
      return compute(newInput, position + 2)
    } else if (instruction === 5) {
      const cond = getInput(0)
      const newLoc = getInput(1)
      return compute(input, cond ? newLoc : position + 3)
    } else if (instruction === 6) {
      const cond = getInput(0)
      const newLoc = getInput(1)
      const newPos = !cond ? newLoc : position + 3
      return compute(input, newPos)
    } else if (instruction === 7) {
      const first = getInput(0)
      const second = getInput(1)
      const result = first < second ? 1 : 0
      const newData = [...data]
      newData[params[2]] = result
      return compute(input, position + 4)
    } else if (instruction === 8) {
      const first = getInput(0)
      const second = getInput(1)
      const result = first === second ? 1 : 0
      const newData = [...data]
      newData[params[2]] = result
      return compute(input, position + 4)
    } else if (instruction === 99) {
      return
    }
    throw new Error("invalid instruction")
  }
