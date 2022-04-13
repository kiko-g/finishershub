import api from '../api/twitch'
import Seo from '../components/Seo'
import '../styles/pages/index.css'
import { useStaticQuery, graphql } from 'gatsby'
import { PlusIcon } from '@heroicons/react/solid'
import React, { useState, useEffect } from 'react'
import usePaginationQuantity from '../hooks/usePaginationQuantity'

import { ClipsResponse } from '../@types'
import { Layout } from '../layout/Layout'
import { Skeleton } from '../components/Skeleton'
import { ViewTogglers } from '../components/ViewTogglers'
import { TwitchVideoClip } from '../components/TwitchVideoClip'

const IndexPage = () => {
  const [view, setView] = useState(false)
  const [cursor, setCursor] = useState('')
  const [videos, setVideos] = useState([])
  const [mounted, setMounted] = useState(false)
  const [paginationQuantity, setPaginationQuantity] = usePaginationQuantity()

  const parseVideos = (response: ClipsResponse) => {
    setCursor(response.pagination.cursor)
    setVideos(
      response.data
        .filter(({ game_id }) => game_id.toString() === process.env.GATSBY_TWITCH_MW_GAME_ID)
        .map(({ embed_url }) => embed_url)
    )
    setMounted(true)
  }

  const parseLoadMoreVideos = (response: ClipsResponse) => {
    setCursor(response.pagination.cursor)
    setVideos([
      ...videos,
      ...response.data
        .filter(({ game_id }) => game_id.toString() === process.env.GATSBY_TWITCH_MW_GAME_ID)
        .map(({ embed_url }) => embed_url),
    ])
    setMounted(true)
  }

  useEffect(() => {
    api.getClips((response: ClipsResponse) => parseVideos(response), paginationQuantity)
  }, [])

  const data = useStaticQuery(homeQuery)
  const title = data.site.siteMetadata?.title ?? 'Title'
  const description = data.site.siteMetadata?.description ?? 'Description'

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
        {mounted
          ? videos.map((video, videoIdx) => (
              <TwitchVideoClip video={video} parent={process.env.GATSBY_DOMAIN} key={`video-${videoIdx}`} />
            ))
          : Array(paginationQuantity)
              .fill(null)
              .map((_, skeletonIdx) => <Skeleton key={`skeleton-${skeletonIdx}`} />)}
      </main>
      <footer>
        <button
          type="button"
          className="load-more"
          onClick={() => {
            setMounted(false)
            api.getMoreClips((response: ClipsResponse) => parseLoadMoreVideos(response), paginationQuantity, cursor)
          }}
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
