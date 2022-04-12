import axios, { AxiosInstance } from 'axios'

const PAGINATION_AMOUNT = 100
const TWITCH_API_URL = 'https://api.twitch.tv/helix'

const getClips = (callback: Function) => {
  let api: AxiosInstance
  axios
    .post('https://id.twitch.tv/oauth2/token', {
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
      api
        .get(`${TWITCH_API_URL}/clips?broadcaster_id=${process.env.GATSBY_TWITCH_BROADCASTER_ID}&first=${PAGINATION_AMOUNT}`)
        .then(response => callback(response.data))
    })
    .catch(error => console.log(error))
}

export { getClips }
