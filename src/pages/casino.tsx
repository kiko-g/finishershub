import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import Layout from '../layout'
import AccessModal from '../layout/AccessModal'
import useAccessDenied from '../hooks/useAccessDenied'
import TwitchAPI from '../api/twitch'
import Seo from '../components/Seo'
import { shuffle } from '../utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { clearCache, isStorageValid, writeVideosStorage } from '../utils/storage'
import {
  AutoplayToggler,
  MuteToggler,
  UsageDisclaimer,
  TwitchVideoClip,
  Skeleton,
  ShuffleButton,
  DeleteCookiesButton,
} from '../components/casino'
import '../styles/pages/casino.css'

const CasinoPage = () => {
  const sensitive = Boolean(process.env.GATSBY_SENSITIVE) || true // whether the site contains sensitive/private information
  const isMobile = useMediaQuery('(max-width: 768px)') // whether the screen is mobile or not
  const [index, setIndex] = useState(0) // index of the current video
  const [videos, setVideos] = useState([]) //array of arrays with video links
  const [accessDenied, setAccessDenied] = useAccessDenied() // control access to content
  const [muted, setMuted] = useState(true) //muted videos or not
  const [autoplay, setAutoplay] = useState(true) //play automatically videos or not

  const prevVideo = () => setIndex(prev => prev - 1)

  const nextVideo = () => setIndex(prev => prev + 1)

  const shuffleAndSetVideos = () => {
    setVideos(shuffle(JSON.parse(localStorage.getItem('finishershub.videos'))))
  }

  const requestLoadAll = () => {
    if (isStorageValid()) {
      shuffleAndSetVideos()
    } else {
      clearCache(true)
      TwitchAPI.getAllClips((allEmbedUrls: string[]) => {
        const shuffledVideos = shuffle(allEmbedUrls)
        setVideos(shuffledVideos)
        writeVideosStorage(shuffledVideos)
      })
    }
  }

  useEffect(() => requestLoadAll(), [])

  useEffect(() => {
    if (!accessDenied) {
      setMuted(false)
    }
  }, [accessDenied])

  return (
    <Layout location="Casino" wrapperClassNames="max-w-5xl">
      <Seo title="Casino" />
      {sensitive ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} /> : null}
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
            <DeleteCookiesButton />
            <ShuffleButton shuffle={shuffleAndSetVideos} />
            <AutoplayToggler hook={[autoplay, setAutoplay]} />
            <MuteToggler hook={[muted, setMuted]} />
          </div>
        </header>

        <UsageDisclaimer />

        {isMobile ? (
          // Display Mobile
          <main className="flex w-full flex-col gap-6">
            <div className="w-full">
              <TwitchVideoClip
                muted={muted}
                video={videos[index]}
                parent={process.env.GATSBY_DOMAIN}
                autoplay={index === 0 ? true : autoplay}
              />
            </div>
            <div className="flex w-full justify-between">
              <button
                onClick={prevVideo}
                disabled={index === 0}
                title="Go to the previous highlight"
                className="arrow left"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={nextVideo}
                disabled={index === videos.length - 1}
                title="Go to the next highlight"
                className="arrow right"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </main>
        ) : (
          // Display Desktop
          <main className="flex h-full w-full items-center gap-x-1.5 rounded px-0 lg:gap-x-3">
            <button
              onClick={prevVideo}
              disabled={index === 0}
              title="Go to the previous highlight"
              className="arrow left"
            >
              <ChevronLeftIcon />
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
              className="arrow right"
            >
              <ChevronRightIcon />
            </button>
          </main>
        )}
      </div>
    </Layout>
  )
}

export default CasinoPage
