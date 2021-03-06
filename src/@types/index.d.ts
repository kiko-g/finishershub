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

export type RegistryEntry = {
  _id: string
  id: number
  name: string
  finishers: number
  aliases: string[]
  code: string
  imgurUrl: string
}
