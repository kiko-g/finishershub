import axios, { AxiosInstance } from 'axios'

const PAGINATION = 9
const TWITCH_API_URL = 'https://api.twitch.tv/helix'
const TWITCH_API_TOKEN_URL = 'https://id.twitch.tv/oauth2/token'

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

const getClips = (callback: Function) => {
  twitchApiRequest(`clips?broadcaster_id=${process.env.GATSBY_TWITCH_BROADCASTER_ID}&first=${PAGINATION}`, callback)
}

const api = {
  getClips,
}

export default api
