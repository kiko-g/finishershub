type Clip = {
  broadcaster_id: number
  broadcaster_name: string
  created_at: string
  creator_id: number
  creator_name: string
  duration: number
  embed_url: string
  game_id: number
  id: string
  language: string
  thumbnail_url: string
  title: string
  url: string
  video_id: string
  view_count: number
}

type Pagination = {
  cursor: string
}

export type ClipsResponse = {
  data: Clip[]
  pagination: Pagination
}

export type FinishersClubMember = {
  _id: string
  id: number
  name: string
  finishers: number[]
  aliases: string[]
  code: string
  imgurUrl: string
}

export type CatalogueItemStatus = "Yes" | "No" | "Almost" | ""

export type CatalogueItem = {
  name: string
  source: string
  season: number
  unlocked: CatalogueItemStatus
  accurate: CatalogueItemStatus
  ttrk: number
  ttca: number
  slippery: 1 | 2 | 3 | 4 | 5
  ledgeDanger: 1 | 2 | 3 | 4 | 5
  score: number
  video: string
}

export type VideoFromS3 = {
  url: string
  date: string
  game: "mw2019" | "mw2022"
  filename: string
}

export type VideoAPIAndIndex = {
  index: number
  video: VideoFromS3
}

export type FilterByGameType =
  | { name: "All"; value: "" }
  | { name: "Warzone 1"; value: "mw2019" }
  | { name: "Warzone 2"; value: "mw2022" }

export interface VideoMongoDBWithUrl {
  _id: string
  id: number
  authors: string[]
  quantity: number
  tags: string[]
  map: string
  location: string
  game: string
  bucket: string
  s3_uri: string
  url: string
}
