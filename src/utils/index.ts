const daysDifference = (before: Date, after: Date) => {
  let a = new Date(after.toString())
  let b = new Date(before.toString())

  return (a.getTime() - b.getTime()) / (1000 * 3600 * 24)
}

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const shuffle = (array: any[]) => {
  let result = []
  while (array.length) {
    let randomIndex = Math.floor(Math.random() * array.length),
      element = array.splice(randomIndex, 1)

    result.push(element[0])
  }
  return result
}

export { daysDifference, randomBetween, shuffle }
