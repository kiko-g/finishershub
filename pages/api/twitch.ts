import axios, { AxiosInstance } from "axios"
import { type ClipsResponse } from "@/@types"
import type { NextApiRequest, NextApiResponse } from "next"

const TWITCH_API_URL = "https://api.twitch.tv/helix"
const TWITCH_API_TOKEN_URL = "https://id.twitch.tv/oauth2/token"
const TWITCH_API_MAX_CLIPS = 100
const TWITCH_CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
const TWITCH_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET

const twitchApiRequest = (url: string, callback: Function) => {
  let api: AxiosInstance
  axios
    .post(TWITCH_API_TOKEN_URL, {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    })
    .then((response) => {
      api = axios.create({
        headers: {
          "Client-ID": TWITCH_CLIENT_ID,
          Authorization: `Bearer ${response.data.access_token}`,
        },
      })
    })
    .then(() => {
      api.get(`${TWITCH_API_URL}/${url}`).then((response) => callback(response.data))
    })
    .catch((error) => console.log(error))
}

const paginationCycle = (videos: string[], url: string, cursor: string, callback: Function) => {
  if (cursor) {
    twitchApiRequest(`${url}&after=${cursor}`, (res: ClipsResponse) => {
      let embed_urls = res.data.map(({ embed_url }) => embed_url)
      let newCursor = res.pagination.cursor
      videos = videos.concat(embed_urls)
      paginationCycle(videos, url, newCursor, callback)
    })
  } else callback(videos)
}

export default async function getAllClips(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    let videos: string[] = []
    const url = `clips?broadcaster_id=${process.env.NEXT_PUBLIC_TWITCH_BROADCASTER_ID}&first=${TWITCH_API_MAX_CLIPS}`

    twitchApiRequest(url, (response: ClipsResponse) => {
      let embed_urls = response.data.map(({ embed_url }) => embed_url)
      let cursor = response.pagination.cursor
      videos = videos.concat(embed_urls)
      paginationCycle(videos, url, cursor, (complete: string[]) => res.status(200).json(complete))
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
