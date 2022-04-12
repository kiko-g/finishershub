import React, { useState, useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'
import Seo from '../components/Seo'
import { Layout } from '../layout/Layout'
import { useStaticQuery, graphql } from 'gatsby'
import { Carousel } from '../components/Carousel'
import { ViewTogglers } from '../components/ViewTogglers'

const mock = [
  'https://production.assets.clips.twitchcdn.net/AT-cm%7C1189457827.mp4?sig=575f9f2caa8d202a88c59da36a400e332891df5a&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2FAT-cm%257C1189457827.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649775327%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D',
  'https://production.assets.clips.twitchcdn.net/AT-cm%7C1189436086.mp4?sig=5cf47e585be7abe2607370ec7ff2fa8b732441f8&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2FAT-cm%257C1189436086.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649775416%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D',
  'https://production.assets.clips.twitchcdn.net/39678527915-offset-2590.mp4?sig=555cb45b26ebedaf4e916f0eaf1d9c5e97cbe9b3&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2F39678527915-offset-2590.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649775515%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D',
  'https://production.assets.clips.twitchcdn.net/39346168667-offset-4758.mp4?sig=32d7dc59c8ddeffeb880b555ab324198bdc5268a&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2F39346168667-offset-4758.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649775973%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D',
  'https://production.assets.clips.twitchcdn.net/39384140203-offset-3278.mp4?sig=fd8ec8ba17524cbe3f67972f6a894567d80ccc0c&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2F39384140203-offset-3278.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649776029%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D',
  'https://production.assets.clips.twitchcdn.net/42933675437-offset-7816.mp4?sig=ebc34f0a5138380f5704d02d99a9e8979278e368&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2F42933675437-offset-7816.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649708403%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D',
]

const IndexPage = () => {
  const [view, setView] = useState(false)
  const [videos, setVideos] = useState(mock)

  let api: AxiosInstance
  useEffect(() => {
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
  }, [])

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <Layout location="Home" background={false}>
      <Seo title="Home" />
      <header>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{data.site.siteMetadata?.title}</h2>
        <div className="mt-4 flex justify-between space-x-2 md:space-x-3">
          <p className="grow text-lg font-normal">{data.site.siteMetadata?.description}</p>
          <ViewTogglers viewHook={[view, setView]} />
        </div>
      </header>
      <div className={`mt-4 grid grid-cols-1 gap-4 py-2 md:mt-0 md:gap-6 md:py-4 ${view ? 'md:grid-cols-1' : 'md:grid-cols-3'}`}>
        {videos.map((video, videoIdx) => (
          <Carousel video={video} key={`video-${videoIdx}`} />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
