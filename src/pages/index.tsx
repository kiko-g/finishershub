import React, { useState, useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'
import Seo from '../components/Seo'
import { Layout } from '../layout/Layout'
import { useStaticQuery, graphql } from 'gatsby'
import { Carousel } from '../components/Carousel'
import { ViewTogglers } from '../components/ViewTogglers'
import { getClips } from '../api/twitch'

const mock = [
  'https://production.assets.clips.twitchcdn.net/39346168667-offset-4758.mp4?sig=32d7dc59c8ddeffeb880b555ab324198bdc5268a&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2F39346168667-offset-4758.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649775973%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D',
  'https://production.assets.clips.twitchcdn.net/39384140203-offset-3278.mp4?sig=fd8ec8ba17524cbe3f67972f6a894567d80ccc0c&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2F39384140203-offset-3278.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649776029%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D',
  'https://production.assets.clips.twitchcdn.net/42933675437-offset-7816.mp4?sig=ebc34f0a5138380f5704d02d99a9e8979278e368&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2F42933675437-offset-7816.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649708403%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D',
]

const IndexPage = () => {
  const [view, setView] = useState(false)
  const [videos, setVideos] = useState(mock)

  let api: AxiosInstance
  useEffect(() => {
    getClips(api)
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
