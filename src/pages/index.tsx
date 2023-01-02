import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import useAccessDenied from '../hooks/useAccessDenied'
import AccessModal from '../layout/AccessModal'
import TwitchAPI from '../api/twitch'
import Seo from '../components/Seo'
import { shuffle } from '../utils'
import { clearCache, isStorageValid, writeVideosStorage } from '../utils/storage'
import { useStaticQuery, graphql } from 'gatsby'
import { PlusIcon } from '@heroicons/react/solid'
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
import '../styles/pages/index.css'
import { useMediaQuery } from 'usehooks-ts'

const IndexPage = () => {
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
    <Layout location="Home" background={false}>
      <Seo title="Home" />
      {sensitive ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} /> : null}
      <div className="home">
        <header>
          <div className="left">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="right">
            <DeleteCookiesButton />
            <ShuffleButton shuffle={shuffleAndSetVideos} />
            <AutoplayToggler hook={[autoplay, setAutoplay]} />
            <MuteToggler hook={[muted, setMuted]} />
            <ViewToggler hook={[view, setView]} />
          </div>
        </header>

        <DelayDisclaimer />

        <main className={view ? 'video-list' : 'video-grid'}>
          {videos.slice(0, shown).map((video: string, videoIdx: number) => (
            <TwitchVideoClip
              muted={muted}
              video={video}
              parent={process.env.GATSBY_DOMAIN}
              key={`video-${videoIdx}`}
              autoplay={isMobile ? (videoIdx <= showMoreCount ? true : autoplay) : videoIdx === 0 ? true : autoplay}
            />
          ))}
          {videos.length === 0 &&
            Array(shown)
              .fill(null)
              .map((_, skeletonIdx) => <Skeleton key={`skeleton-${skeletonIdx}`} />)}
        </main>

        <footer>
          <button
            type="button"
            className={`load-more ${videos.length === 0 ? 'hidden' : 'inline-flex'}`}
            onClick={() => {
              setShowMoreCount(prev => prev + 1)

              if (isMobile) setShown(prev => prev + 1)
              else setShown(prev => prev + 3)
            }}
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Load More Videos
          </button>
        </footer>
      </div>
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

export default IndexPage
