import api from '../api/twitch'
import '../styles/pages/index.css'
import { shuffle } from '../utils'
import { useStaticQuery, graphql } from 'gatsby'
import { PlusIcon } from '@heroicons/react/solid'
import React, { useState, useEffect } from 'react'

import Seo from '../components/Seo'
import { Layout } from '../layout/Layout'
import { ViewTogglers } from '../components/ViewTogglers'
import { TwitchVideoClip } from '../components/TwitchVideoClip'
import { Skeleton } from '../components/Skeleton'

const IndexPage = () => {
  const data = useStaticQuery(homeQuery)
  const title = data.site.siteMetadata?.title ?? 'Title'
  const description = data.site.siteMetadata?.description ?? 'Description'

  const [shown, setShown] = useState(6)
  const [view, setView] = useState(false) //grid or list view boolean
  const [cursor, setCursor] = useState(null) //pagination cursor string
  const [videos, setVideos] = useState([]) //array of arrays with video links

  const requestLoad = () => {
    api.getClips((cursor: string, embedUrls: string[]) => {
      setCursor(cursor)
      setVideos(embedUrls)
    }, shown)
  }

  const requestLoadMore = () => {
    api.getMoreClips(
      (cursor: string, embedUrls: string[]) => {
        setCursor(cursor)
        setVideos([...videos.concat(embedUrls)])
      },
      shown,
      cursor
    )
  }

  const requestLoadAll = () => {
    api.getAllClips((allEmbedUrls: string[]) => {
      setVideos(shuffle(allEmbedUrls))
    })
  }

  useEffect(() => {
    requestLoadAll()
  }, [])

  return (
    <Layout location="Home" background={false}>
      <Seo title="Home" />
      <header>
        <h2>{title}</h2>
        <div>
          <p>{description}</p>
          <ViewTogglers hook={[view, setView]} />
        </div>
      </header>

      <main className={view ? 'list' : 'grid'}>
        {videos.slice(0, shown).map((video: string, videoIdx: number) => (
          <TwitchVideoClip video={video} parent={process.env.GATSBY_DOMAIN} key={`video-${videoIdx}`} />
        ))}
        {videos.length === 0 &&
          Array(6)
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
