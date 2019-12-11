import { file } from "../helper/file"
import { split, map, filter, head, tail, size } from "lodash"
import { write } from "../day2"

const generateWireVector = (
  wire: string[],
  grid: boolean[][][],
  wireNumber: number,
  currentVector: [number, number]
): boolean[][][] => {
  if (wire.length === 0) {
    return grid
  }
  const instruction = head(wire)
  if (!instruction) throw new Error("no wire")
  const direction = instruction[0]
  const magnitude = parseInt(instruction.slice(1, instruction.length))
  // console.log({ direction, magnitude })
  if (!grid[currentVector[0]]) {
    grid[currentVector[0]] = []
  }
  if (!grid[currentVector[0]][currentVector[1]]) {
    grid[currentVector[0]][currentVector[1]] = []
  }
  if (direction === "D") {
    const [finalVector, newGrid] = goDown(
      grid,
      currentVector,
      magnitude,
      wireNumber
    )
    return generateWireVector(tail(wire), newGrid, wireNumber, finalVector)
  } else if (direction === "L") {
    const [finalVector, newGrid] = goLeft(
      grid,
      currentVector,
      magnitude,
      wireNumber
    )
    return generateWireVector(tail(wire), newGrid, wireNumber, finalVector)
  } else if (direction === "R") {
    const [finalVector, newGrid] = goRight(
      grid,
      currentVector,
      magnitude,
      wireNumber
    )
    return generateWireVector(tail(wire), newGrid, wireNumber, finalVector)
  } else {
    const [finalVector, newGrid] = goUp(
      grid,
      currentVector,
      magnitude,
      wireNumber
    )
    return generateWireVector(tail(wire), newGrid, wireNumber, finalVector)
  }
}

type Move = (
  grid: boolean[][][],
  currentVector: [number, number],
  magnitude: number,
  wireNumber: number
) => [[number, number], boolean[][][]]

const goRight: Move = (grid, cur, mag, wire) => {
  const x = cur[0]
  const y = cur[1]
  let j
  for (j = y; j < y + mag; j++) {
    if (!grid[x]) {
      grid[x] = []
    }
    if (!grid[x][j]) {
      grid[x][j] = []
    }
    grid[x][j][wire] = true
  }
  return [[x, j], grid]
}

const goLeft: Move = (grid, cur, mag, wire) => {
  const x = cur[0]
  const y = cur[1]
  let j
  for (j = y; j > y - mag; j--) {
    if (!grid[x]) {
      grid[x] = []
    }
    if (!grid[x][j]) {
      grid[x][j] = []
    }
    grid[x][j][wire] = true
  }
  return [[x, j], grid]
}
const goDown: Move = (grid, currentVector, magnitude, wireNumber) => {
  const y = currentVector[1]
  let i
  for (i = currentVector[0]; i < currentVector[0] + magnitude; i++) {
    if (!grid[i]) {
      grid[i] = []
    }
    if (!grid[i][y]) {
      grid[i][y] = []
    }
    grid[i][y][wireNumber] = true
  }
  return [[i, y], grid]
}

const goUp: Move = (grid, currentVector, magnitude, wireNumber) => {
  const y = currentVector[1]
  let i
  for (i = currentVector[0]; i > currentVector[0] - magnitude; i--) {
    if (!grid[i]) {
      grid[i] = []
    }
    if (!grid[i][y]) {
      grid[i][y] = []
    }
    grid[i][y][wireNumber] = true
  }
  return [[i, y], grid]
}

const parseFile = (data: string) =>
  map(filter(split(data, "\n")), (wire) => split(wire, ","))

const iterateOverGrid = (grid: boolean[][][]) => {
  let c = []
  for (let i = 0; i < grid.length; i++) {
    if (grid[i]) {
      for (let j = 0; j < grid[i].length; j++) {
        if (size(filter(grid[i][j])) > 1) c.push([i, j])
      }
    }
  }
  return c
}

const showWire = (wire: boolean[][][]) => {
  let x = ""
  wire.forEach((row, i) => {
    row.forEach((point, j) => {
      x += "."
    })
    x += "\n"
  })
  console.log(x)
}

export const doPuzzleOne = async () => {
  try {
    const input = await file("./day3/input.txt")
    if (!input) throw new Error("no file")
    const data = parseFile(input)
    const wires = generateWireVector(data[0], [[]], 0, [0, 0])
    const wires2 = generateWireVector(data[1], wires, 1, [0, 0])
    const crossings = iterateOverGrid(wires2)

    // console.log(crossings)
    showWire(wires2)
    // write(3)(1, wires2.toString())
  } catch (error) {
    console.error(error)
  }
}
