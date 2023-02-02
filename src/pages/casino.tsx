import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import Layout from '../components/layout'
import AccessModal from '../components/layout/AccessModal'
import useAccessDenied from '../hooks/useAccessDenied'
import TwitchAPI from '../api/twitch'
import Seo from '../components/Seo'
import { shuffle } from '../utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
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
import InvisbleTopLayer from '../components/layout/InvisbleTopLayer'

const CasinoPage = () => {
  const sensitive = process.env.GATSBY_SENSITIVE === 'false' ? false : true
  const isMobile = useMediaQuery('(max-width: 768px)')

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
    <Layout location="Casino">
      <Seo title="Casino" />
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4">
          <header className="mt-4 flex flex-col justify-between gap-2 md:space-x-3 lg:flex-row">
            <div className="flex flex-col justify-center gap-2">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Slot Machine</h2>
              <p className="grow text-base font-normal">
                More fun than a casino, especially because we don't take your money. Not sure about the addiction part
                though.
              </p>
            </div>

            <div className="flex items-end justify-end gap-2">
              {sensitive ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} /> : null}
              <DeleteCookiesButton />
              <ShuffleButton shuffle={shuffleAndSetVideos} />
              <AutoplayToggler hook={[autoplay, setAutoplay]} />
              {sensitive && accessDenied ? null : <MuteToggler hook={[muted, setMuted]} />}
            </div>
          </header>

          <UsageDisclaimer />

          {isMobile ? (
            // Display Mobile
            <main className="flex w-full flex-col gap-6">
              {/* Video */}
              <div className="relative w-full">
                {sensitive && accessDenied ? <InvisbleTopLayer /> : null}
                <TwitchVideoClip
                  muted={muted}
                  video={videos[index]}
                  parent={process.env.GATSBY_DOMAIN}
                  autoplay={index === 0 ? true : autoplay}
                />
              </div>

              {/* Arrows */}
              <div className="flex w-full items-center justify-between">
                <button
                  onClick={prevVideo}
                  disabled={index === 0}
                  title="Go to the previous highlight"
                  className="inline-flex items-center rounded-full p-0 text-center text-sm font-medium 
                  text-primary/50 transition hover:opacity-80 enabled:hover:-translate-x-1.5
                  enabled:hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:text-white/50 enabled:dark:hover:text-white"
                >
                  <ChevronLeftIcon className="inline-flex h-12 w-12" />
                </button>
                <button
                  onClick={nextVideo}
                  disabled={index === videos.length - 1}
                  title="Go to the next highlight"
                  className="inline-flex items-center rounded-full p-0 text-center text-sm font-medium text-primary/50 transition hover:opacity-80 enabled:hover:translate-x-1.5 enabled:hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:text-white/50 enabled:dark:hover:text-white"
                >
                  <ChevronRightIcon className="inline-flex h-12 w-12" />
                </button>
              </div>
            </main>
          ) : (
            // Display Desktop
            <main className="mt-1 flex h-full w-full items-center gap-x-2 rounded px-0">
              <button
                onClick={prevVideo}
                disabled={index === 0}
                title="Go to the previous highlight"
                className="inline-flex items-center self-stretch rounded-l-xl px-1 text-center 
                text-sm font-medium text-primary/50 transition hover:opacity-80 enabled:hover:-translate-x-1.5 
                enabled:hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 
                disabled:hover:bg-transparent dark:text-white/50 enabled:dark:hover:text-white"
              >
                <ChevronLeftIcon className="inline-flex h-12 w-12 lg:h-9 lg:w-9" />
              </button>
              <div className="relative w-full">
                {sensitive && accessDenied ? <InvisbleTopLayer /> : null}
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
                className="inline-flex items-center self-stretch rounded-full p-0 text-center text-sm font-medium 
                text-primary/50 transition hover:opacity-80 enabled:hover:translate-x-1.5 enabled:hover:text-primary
                disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:text-white/50 enabled:dark:hover:text-white"
              >
                <ChevronRightIcon className="inline-flex h-12 w-12 lg:h-9 lg:w-9" />
              </button>
            </main>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CasinoPage
