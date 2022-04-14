const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ')
}

const daysDifference = (before: Date, after: Date) => {
  let a = new Date(after.toString())
  let b = new Date(before.toString())

  return (a.getTime() - b.getTime()) / (1000 * 3600 * 24)
}

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export { classNames, daysDifference, randomBetween }
