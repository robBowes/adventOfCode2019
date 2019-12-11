import { split, map } from "lodash"
export const parseCommaSeparatedArray = (str: string) => {
  const arr = split(str, ",")
  const numArr = map(arr, (str) => parseInt(str, 10))
  return numArr
}
