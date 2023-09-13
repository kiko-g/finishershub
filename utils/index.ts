import classNames from "classnames"
import type { VideoMongoDBWithUrl } from "../@types"

export function getButtonSizeClassNames(size: "sm" | "md" | "lg" | "xl") {
  return classNames(
    size === "sm" ? "h-5 w-5 lg:h-6 lg:w-6" : "",
    size === "md" ? "h-6 w-6 lg:h-7 lg:w-7" : "",
    size === "lg" ? "h-7 w-7 lg:h-8 lg:w-8" : "",
    size === "xl" ? "h-8 w-8 lg:h-9 lg:w-9" : "",
  )
}

export function daysDifference(before: Date, after: Date) {
  let a = new Date(after.toString())
  let b = new Date(before.toString())

  return (a.getTime() - b.getTime()) / (1000 * 3600 * 24)
}

export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffle(array: any[]) {
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

/**
 * Finds whether strings are matching depending on the strictness specified in strict variable.
 * @param str string to examine
 * @param query query to find in the string
 * @param strict whether the search should be strict or not
 * @returns
 */
export function strIncludes(str: string, query: string, strict?: boolean) {
  return strict
    ? str.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
    : str
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, "")
        .replace(".", "")
        .replace(":", "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
}

export function getVideoUrlFromVideo(video: VideoMongoDBWithUrl, offset?: number, forceUseProduction?: boolean) {
  const productionBaseUrl = "https://finishershub.vercel.app/"
  const windowUrl = typeof window !== "undefined" ? window.location.origin : ""
  const url = forceUseProduction ? productionBaseUrl : windowUrl
  const index = offset ? video.id + offset : video.id

  return `${url}/video/${index}`
}

export function ensureItemsAreSplit(items?: string[]): string[] {
  return (
    items?.flatMap((item) =>
      typeof item === "string" && item.includes(",") ? item.split(", ").map((x) => x.trim()) : item,
    ) || []
  )
}
