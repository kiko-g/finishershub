import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import api from '../api/twitch'
import Seo from '../components/Seo'
import { shuffle } from '../utils'
import { isStorageValid, writeVideosStorage } from '../utils/storage'
import { useStaticQuery, graphql } from 'gatsby'
import { PlusIcon } from '@heroicons/react/solid'
import { ViewToggler, MuteToggler, DelayDisclaimer, TwitchVideoClip, Skeleton } from '../components/home'
import '../styles/pages/index.css'

const IndexPage = () => {
  const data = useStaticQuery(homeQuery)
  const title = data.site.siteMetadata?.title ?? 'Title'
  const description = data.site.siteMetadata?.description ?? 'Description'

  const [view, setView] = useState(false) //grid or list view
  const [muted, setMuted] = useState(true) //muted or unmuted videos
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
    <Layout location="Home" background={false}>
      <Seo title="Home" />
      <header>
        <h2>{title}</h2>
        <section>
          <p>{description}</p>
          <div>
            <MuteToggler hook={[muted, setMuted]} />
            <ViewToggler hook={[view, setView]} />
          </div>
        </section>
        <DelayDisclaimer />
      </header>

      <main className={view ? 'list' : 'grid'}>
        {videos.slice(0, shown).map((video: string, videoIdx: number) => (
          <TwitchVideoClip
            muted={muted}
            video={video}
            parent={process.env.GATSBY_DOMAIN}
            key={`video-${videoIdx}`}
            autoplay={videoIdx === 0 ? true : false}
          />
        ))}
        {videos.length === 0 &&
          Array(shown)
            .fill(null)
            .map((skeleton, skeletonIdx) => <Skeleton key={`skeleton-${skeletonIdx}`} />)}
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
