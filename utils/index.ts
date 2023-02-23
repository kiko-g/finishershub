export const daysDifference = (before: Date, after: Date) => {
  let a = new Date(after.toString())
  let b = new Date(before.toString())

  return (a.getTime() - b.getTime()) / (1000 * 3600 * 24)
}

export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const shuffle = (array: any[]) => {
  let result = []
  while (array.length) {
    let randomIndex = Math.floor(Math.random() * array.length),
      element = array.splice(randomIndex, 1)

    result.push(element[0])
  }
  return result
}

export function transpose<T>(arr: T[][]): T[][] {
  const numRows = arr.length
  const numCols = arr[0].length

  const transposed = new Array(numCols)
  for (let i = 0; i < numCols; i++) {
    transposed[i] = new Array(numRows)
    for (let j = 0; j < numRows; j++) {
      transposed[i][j] = arr[j][i]
    }
  }

  return transposed
}
