import React, { useState, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import TwitchAPI from '../api/twitch'
import useAccessDenied from '../hooks/useAccessDenied'
import { useMediaQuery } from 'usehooks-ts'
import { shuffle } from '../utils'
import { clearCache, isStorageValid, writeVideosStorage } from '../utils/storage'
import { useStaticQuery, graphql } from 'gatsby'
import Seo from '../components/Seo'
import Layout from '../components/layout'
import InvisbleTopLayer from '../components/layout/InvisbleTopLayer'
import AccessModal from '../components/layout/AccessModal'
import { PlusIcon } from '@heroicons/react/24/solid'
import {
  ViewToggler,
  AutoplayToggler,
  MuteToggler,
  ShuffleButton,
  DelayDisclaimer,
  TwitchVideoClip,
  DeleteCookiesButton,
  Skeleton,
} from '../components/home'
import { FullAccessBadge, LimitedAccessBadge } from '../components/utils'

export default function IndexPage() {
  const data = useStaticQuery(homeQuery) // query for site metadata
  const title = data.site.siteMetadata?.title ?? 'Title' // title of the site
  const description = data.site.siteMetadata?.description ?? 'Description' // description of the site

  const sensitive = process.env.GATSBY_SENSITIVE === 'false' ? false : true // whether the site contains sensitive/private information
  const isMobile = useMediaQuery('(max-width: 768px)') // whether the screen is mobile or not

  const [shown, setShown] = useState(isMobile ? 1 : 3) // amount of clips displayed
  const [videos, setVideos] = useState([]) // array of arrays with video links
  const [accessDenied, setAccessDenied] = useAccessDenied() // control access to content
  const [view, setView] = useState(false) // grid or list view
  const [muted, setMuted] = useState(true) // muted videos or not
  const [autoplay, setAutoplay] = useState(false) // play automatically videos or not
  const [showMoreCount, setShowMoreCount] = useState(0) // counts when show more is pressed
  const limitedAccess = useMemo(() => sensitive && accessDenied, [sensitive, accessDenied])

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

  const loadMore = () => {
    setShowMoreCount(prev => prev + 1)
    if (isMobile) setShown(prev => prev + 1)
    else setShown(prev => prev + 3)
  }

  useEffect(() => requestLoadAll(), [])

  useEffect(() => {
    if (accessDenied) {
      setMuted(true)
      setAutoplay(true)
    } else {
      setMuted(false)
      setAutoplay(false)
    }
  }, [accessDenied])

  return (
    <Layout location="Home" background={false}>
      <Seo title="Home" />
      <main className="flex flex-col gap-2 px-0 lg:px-4">
        <div className="mt-1 flex flex-col justify-between gap-y-2 lg:mt-3 lg:flex-row lg:gap-x-6">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
            <p className="grow text-lg font-normal">{description}</p>
          </div>
          <div className="mt-1 flex flex-row items-center justify-end gap-3 lg:mt-0 lg:flex-col">
            {limitedAccess ? <LimitedAccessBadge /> : <FullAccessBadge />}
            <div className="flex items-center justify-end gap-x-2">
              {limitedAccess ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} /> : null}
              <DeleteCookiesButton />
              <ShuffleButton shuffle={shuffleAndSetVideos} />
              <AutoplayToggler hook={[autoplay, setAutoplay]} />
              {limitedAccess ? null : <MuteToggler hook={[muted, setMuted]} />}
              <ViewToggler hook={[view, setView]} />
            </div>
          </div>
        </div>

        <div className="mt-2">
          <DelayDisclaimer />
        </div>

        <div
          className={classNames(
            'relative',
            view ? 'grid-cols-1' : 'sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3',
            'mb-2 grid grid-cols-1 gap-6 py-2 md:mt-0 md:gap-5 md:py-4'
          )}
        >
          {limitedAccess ? <InvisbleTopLayer /> : null}
          {videos.slice(0, shown).map((video: string, videoIdx: number) => {
            const play = isMobile ? (videoIdx <= showMoreCount ? true : autoplay) : videoIdx === 0 ? true : autoplay
            return (
              <TwitchVideoClip
                muted={muted}
                video={video}
                parent={process.env.GATSBY_DOMAIN}
                key={`video-${videoIdx}`}
                autoplay={play}
              />
            )
          })}
          {videos.length === 0 &&
            Array(shown)
              .fill(null)
              .map((_, skeletonIdx) => <Skeleton key={`skeleton-${skeletonIdx}`} />)}
        </div>

        <div className="mb-8 flex items-center justify-center">
          <button
            type="button"
            onClick={loadMore}
            className={classNames(
              videos.length === 0 ? 'hidden' : 'inline-flex',
              'items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            )}
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Load More Videos
          </button>
        </div>
      </main>
    </Layout>
  )
}

const homeQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
