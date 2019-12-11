import { readFile } from "fs"
export const file = async (path: string) => {
  const input = () =>
    new Promise<string>((resolve, reject) => {
      readFile(path, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data.toString())
      })
    })
  try {
    return await input()
  } catch (error) {
    console.error(error)
  }
}
