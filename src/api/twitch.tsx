import axios, { AxiosInstance } from 'axios'

const getClips = (api: AxiosInstance) => {
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
      api.get('https://api.twitch.tv/helix/clips?broadcaster_id=40540258&first=100').then(res => {
        console.log(res.data)
      })
    })
    .catch(error => console.log(error))
}

export { getClips }
