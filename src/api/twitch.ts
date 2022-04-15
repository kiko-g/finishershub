import axios, { AxiosInstance } from 'axios'
import { ClipsResponse } from '../@types'
import { daysDifference, randomBetween } from '../utils'

const TWITCH_API_URL = 'https://api.twitch.tv/helix'
const TWITCH_API_TOKEN_URL = 'https://id.twitch.tv/oauth2/token'
const TWITCH_API_MAX_CLIPS = 100

const twitchApiRequest = (url: string, callback: Function) => {
  let api: AxiosInstance
  axios
    .post(TWITCH_API_TOKEN_URL, {
      client_id: process.env.GATSBY_CLIENT_ID,
      client_secret: process.env.GATSBY_CLIENT_SECRET,
      grant_type: 'client_credentials',
    })
    .then(response => {
      api = axios.create({
        headers: {
          'Client-ID': process.env.GATSBY_CLIENT_ID,
          Authorization: `Bearer ${response.data.access_token}`,
        },
      })
    })
    .then(() => {
      api.get(`${TWITCH_API_URL}/${url}`).then(response => callback(response.data))
    })
    .catch(error => console.log(error))
}

const getClips = (callback: Function, paginationQuantity: any) => {
  const today = new Date()
  const debut = new Date('2021, 5, 1')
  const minimum = new Date('2021, 7, 20')

  const start = debut
  const end = today
  const offset = randomBetween(0, Math.round(daysDifference(debut, minimum)))
  start.setDate(start.getDate() + offset)

  const url =
    'clips' +
    ('?broadcaster_id=' + process.env.GATSBY_TWITCH_BROADCASTER_ID) +
    ('&first=' + (paginationQuantity + 3)) +
    ('&started_at=' + start.toISOString()) +
    ('&ended_at=' + end.toISOString())

  twitchApiRequest(url, (response: ClipsResponse) =>
    callback(
      response.pagination.cursor,
      response.data.map(({ embed_url }) => embed_url)
    )
  )
}

const getMoreClips = (callback: Function, paginationQuantity: any, cursor: string) => {
  if (!cursor) return
  const url = `clips?broadcaster_id=${process.env.GATSBY_TWITCH_BROADCASTER_ID}&first=${paginationQuantity}&after=${cursor}`

  twitchApiRequest(url, (response: ClipsResponse) =>
    callback(
      response.pagination.cursor,
      response.data.map(({ embed_url }) => embed_url)
    )
  )
}

const getAllClips = (callback: Function) => {
  let videos: string[] = []
  const url = `clips?broadcaster_id=${process.env.GATSBY_TWITCH_BROADCASTER_ID}&first=${TWITCH_API_MAX_CLIPS}`

  twitchApiRequest(url, (response: ClipsResponse) => {
    let embed_urls = response.data.map(({ embed_url }) => embed_url)
    let cursor = response.pagination.cursor
    videos = videos.concat(embed_urls)
    paginationCycle(videos, url, cursor, callback)
  })
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

const api = {
  getClips,
  getMoreClips,
  getAllClips,
}

export default api
