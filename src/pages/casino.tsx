import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import api from '../api/twitch'
import Seo from '../components/Seo'
import { shuffle } from '../utils'
import { isStorageValid, writeVideosStorage } from '../utils/storage'
import {
  AutoplayToggler,
  MuteToggler,
  UsageDisclaimer,
  TwitchVideoClip,
  Skeleton,
  ShuffleButton,
} from '../components/casino'
import '../styles/pages/casino.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const CasinoPage = () => {
  const [index, setIndex] = useState(0) // index of the current video
  const [muted, setMuted] = useState(true) //muted videos or not
  const [autoplay, setAutoplay] = useState(true) //play automatically videos or not
  const [videos, setVideos] = useState([]) //array of arrays with video links

  const prevVideo = () => setIndex(prev => prev - 1)

  const nextVideo = () => setIndex(prev => prev + 1)

  const shuffleAndSetVideos = () => {
    setVideos(shuffle(JSON.parse(localStorage.getItem('finishershub.videos'))))
  }

  const requestLoadAll = () => {
    if (isStorageValid(24 * 7)) {
      shuffleAndSetVideos()
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
    <Layout location="Casino" wrapperClassNames="max-w-5xl">
      <Seo title="Casino" />
      <div className="casino">
        <header>
          <div className="left">
            <h2>Finishers Hub Slot Machine</h2>
            <p>
              More fun than a casino, especially because we don't take your money. Not sure about the addiction part
              though.
            </p>
          </div>
          <div className="right">
            <ShuffleButton shuffle={shuffleAndSetVideos} />
            <AutoplayToggler hook={[autoplay, setAutoplay]} />
            <MuteToggler hook={[muted, setMuted]} />
          </div>
        </header>

        <UsageDisclaimer />

        <main>
          <button
            onClick={prevVideo}
            disabled={index === 0}
            title="Go to the previous highlight"
            className="arrow bg-primary/20 text-primary hover:bg-primary hover:text-white"
          >
            <ChevronLeftIcon className="inline-flex h-8 w-8" />
          </button>
          <div className="w-full">
            <TwitchVideoClip
              muted={muted}
              video={videos[index]}
              parent={process.env.GATSBY_DOMAIN}
              autoplay={index === 0 ? true : autoplay}
            />
          </div>
          <button
            onClick={nextVideo}
            disabled={index === videos.length - 1}
            title="Go to the next highlight"
            className="arrow bg-primary/20 text-primary hover:bg-primary hover:text-white"
          >
            <ChevronRightIcon className="inline-flex h-8 w-8" />
          </button>
        </main>
      </div>
    </Layout>
  )
}

export default CasinoPage
