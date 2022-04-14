import axios, { AxiosInstance } from 'axios'

const TWITCH_API_URL = 'https://api.twitch.tv/helix'
const TWITCH_API_TOKEN_URL = 'https://id.twitch.tv/oauth2/token'

const daysDifference = (before: Date, after: Date) => {
  let a = new Date(after.toString())
  let b = new Date(before.toString())

  return (a.getTime() - b.getTime()) / (1000 * 3600 * 24)
}

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

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

  twitchApiRequest(url, callback)
}

const getMoreClips = (callback: Function, paginationQuantity: any, cursor: string) => {
  if (!cursor) return
  const url = `clips?broadcaster_id=${process.env.GATSBY_TWITCH_BROADCASTER_ID}&first=${paginationQuantity}&after=${cursor}`
  twitchApiRequest(url, callback)
}

const api = {
  getClips,
  getMoreClips,
}

export default api
