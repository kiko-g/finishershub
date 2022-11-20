import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import useAccessDenied from '../hooks/useAccessDenied'
import AccessModal from '../layout/AccessModal'
import api from '../api/twitch'
import Seo from '../components/Seo'
import { classNames, shuffle } from '../utils'
import { isStorageValid, writeVideosStorage } from '../utils/storage'
import { useStaticQuery, graphql } from 'gatsby'
import { PlusIcon } from '@heroicons/react/solid'
import {
  ViewToggler,
  AutoplayToggler,
  MuteToggler,
  ShuffleButton,
  DelayDisclaimer,
  TwitchVideoClip,
  Skeleton,
} from '../components/home'
import '../styles/pages/index.css'

const IndexPage = () => {
  const data = useStaticQuery(homeQuery)
  const title = data.site.siteMetadata?.title ?? 'Title'
  const description = data.site.siteMetadata?.description ?? 'Description'

  const [shown, setShown] = useState(9) // amount of clips displayed
  const [videos, setVideos] = useState([]) //array of arrays with video links
  const [accessDenied, setAccessDenied] = useAccessDenied() // control access to content
  const [view, setView] = useState(false) //grid or list view
  const [muted, setMuted] = useState(true) //muted videos or not
  const [autoplay, setAutoplay] = useState(false) //play automatically videos or not

  const shuffleAndSetVideos = () => {
    setVideos(shuffle(JSON.parse(localStorage.getItem('finishershub.videos'))))
  }

  const requestLoadAll = () => {
    if (isStorageValid(24 * 30)) {
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
    <Layout location="Home" background={false}>
      <Seo title="Home" />
      <AccessModal lockedHook={[accessDenied, setAccessDenied]} />
      <div className="home">
        <header>
          <div className="left">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="right">
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
              autoplay={videoIdx === 0 ? true : autoplay}
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
            onClick={() => setShown(shown + 3)}
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
