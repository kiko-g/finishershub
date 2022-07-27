import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import api from '../api/twitch'
import Seo from '../components/Seo'
import { shuffle } from '../utils'
import { isStorageValid, writeVideosStorage } from '../utils/storage'
import { PlusIcon } from '@heroicons/react/solid'
import { AutoplayToggler, MuteToggler, UsageDisclaimer, TwitchVideoClip, Skeleton } from '../components/casino'
import '../styles/pages/casino.css'

const CasinoPage = () => {
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(true) //muted or unmuted videos
  const [autoplay, setAutoplay] = useState(false) //muted or unmuted videos
  const [shown, setShown] = useState(9) // amount of clips displayed
  const [videos, setVideos] = useState([]) //array of arrays with video links

  const requestLoadAll = () => {
    if (isStorageValid(24 * 7)) {
      setVideos(shuffle(JSON.parse(localStorage.getItem('finishershub.videos'))))
    } else {
      api.getAllClips((allEmbedUrls: string[]) => {
        const shuffledVideos = shuffle(allEmbedUrls)
        setVideos(shuffledVideos)
        writeVideosStorage(shuffledVideos)
      })
    }
  }

  useEffect(() => requestLoadAll(), [])

  return (
    <Layout location="Casino" background={false}>
      <Seo title="Casino" />
      <div className="home">
        <header>
          <div className="left">
            <h2>Finishers Hub Slot Machine</h2>
            <p>
              More fun than a casino, especially because we don't take your money. Not sure about the addiction part
              though.
            </p>
          </div>
          <div className="right">
            <AutoplayToggler hook={[autoplay, setAutoplay]} />
            <MuteToggler hook={[muted, setMuted]} />
          </div>
        </header>

        <UsageDisclaimer />

        <main className="video-list">
          <TwitchVideoClip
            muted={muted}
            video={videos[index]}
            parent={process.env.GATSBY_DOMAIN}
            autoplay={index === 0 ? true : autoplay}
          />
          {videos.length === 0 && <Skeleton />}
        </main>
      </div>
    </Layout>
  )
}

export default CasinoPage
