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
  const data = useStaticQuery(homeQuery)
  const title = data.site.siteMetadata?.title ?? 'Title'
  const description = data.site.siteMetadata?.description ?? 'Description'

  const [view, setView] = useState(false) //grid or list view boolean
  const [cursor, setCursor] = useState(null) //pagination cursor string
  const [videos, setVideos] = useState([[]]) //array of arrays with video links
  const [mounted, setMounted] = useState([false]) //array of boolean
  const [paginationQuantity] = usePaginationQuantity()

  const requestLoad = () => {
    api.getClips((response: ClipsResponse) => {
      setCursor(response.pagination.cursor)
      setVideos([[...response.data.map(({ embed_url }) => embed_url)]])
      setMounted([true])
    }, paginationQuantity)
  }

  const requestLoadMore = () => {
    setMounted([...mounted, false])
    api.getMoreClips(
      (response: ClipsResponse) => {
        setCursor(response.pagination.cursor)
        setVideos([...videos, [...response.data.map(({ embed_url }) => embed_url)]])
        setMounted([...mounted, true])
      },
      paginationQuantity,
      cursor
    )
  }

  useEffect(() => {
    requestLoad()
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
        {mounted.map((isMounted, index: number) =>
          isMounted
            ? videos[index].map((video: string, videoIdx: number) => (
                <TwitchVideoClip video={video} parent={process.env.GATSBY_DOMAIN} key={`video-${index}-${videoIdx}`} />
              ))
            : Array(paginationQuantity)
                .fill(null)
                .map((_, skeletonIdx) => <Skeleton key={`skeleton-${skeletonIdx}`} />)
        )}
      </main>
      <footer>
        {cursor && (
          <button type="button" className="load-more" onClick={() => requestLoadMore()}>
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Load More Videos
          </button>
        )}
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
