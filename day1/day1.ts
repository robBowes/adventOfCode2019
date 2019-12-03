import fs, { writeFile } from "fs"
import { map, split, reduce, filter } from "lodash"

export const doFirstPuzzle = async () => {
  const data = await getData()
  const result = calculateAllFuelNeeded(data)
  writeFile("./day1/result1.txt", result, () => {
    console.log("puzzle one complete")
  })
}

export const doSecondPuzzle = async () => {
  const data = await getData()
  const result = calculateAllFuelNeeded2(data)
  writeFile("./day1/result2.txt", result, () => {
    console.log("puzzle two complete")
  })
}

const readData = () =>
  new Promise<string>((resolve, reject) => {
    fs.readFile("./day1/input.txt", (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data.toString())
    })
  })

const parseData = (data: string) => {
  const arr = split(data, "\n")
  const cleaned = map(arr, (entry) => parseInt(entry))
  return cleaned
}

const getData = async () => {
  const raw = await readData()
  return filter(parseData(raw))
}

const divideByThree = (num: number) => num / 3

const roundDown = (num: number) => Math.floor(num)

const subtractTwo = (num: number) => num - 2

const sum = (nums: number[]) => reduce(nums, (acc, el) => acc + el)

export const calculateFuelNeeded = (weight: number) =>
  subtractTwo(roundDown(divideByThree(weight)))

export const recursiveCalculateFuel = (weight: number): number => {
  const fuel = calculateFuelNeeded(weight)
  if (fuel <= 0) {
    return 0
  }
  return recursiveCalculateFuel(fuel) + fuel
}

const calculateAllFuelNeeded = (data: number[]) =>
  sum(map(data, calculateFuelNeeded))

const calculateAllFuelNeeded2 = (data: number[]) =>
  sum(map(data, recursiveCalculateFuel))
