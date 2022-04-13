import api from '../api/twitch'
import Seo from '../components/Seo'
import { useStaticQuery, graphql } from 'gatsby'
import React, { useState, useEffect } from 'react'

import { ClipsResponse } from '../@types'
import { Layout } from '../layout/Layout'
import { Skeleton } from '../components/Skeleton'
import { ViewTogglers } from '../components/ViewTogglers'
import { TwitchVideoClip } from '../components/TwitchVideoClip'
import usePaginationQuantity from '../hooks/usePaginationQuantity'
import { PlusIcon } from '@heroicons/react/solid'

const IndexPage = () => {
  const [view, setView] = useState(false)
  const [cursor, setCursor] = useState('')
  const [videos, setVideos] = useState([])
  const [mounted, setMounted] = useState(false)
  const [paginationQuantity, setPaginationQuantity] = usePaginationQuantity()

  useEffect(() => {
    api.getClips((response: ClipsResponse) => {
      setCursor(response.pagination.cursor)
      setVideos(response.data.map(({ embed_url }) => embed_url))
      setMounted(true)
    }, paginationQuantity)
  }, [paginationQuantity])

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <Layout location="Home" background={false}>
      <Seo title="Home" />
      <header>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{data.site.siteMetadata?.title}</h2>
        <div className="mt-4 flex justify-between space-x-2 md:space-x-3">
          <p className="grow text-lg font-normal">{data.site.siteMetadata?.description}</p>
          <ViewTogglers viewHook={[view, setView]} />
        </div>
      </header>

      <main
        className={`mt-4 grid grid-cols-1 gap-4 py-2 md:mt-0 md:gap-5 md:py-4 ${
          view ? '' : 'sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
        }`}
      >
        {mounted
          ? videos.map((video, videoIdx) => (
              <TwitchVideoClip video={video} parent={process.env.GATSBY_DOMAIN} key={`video-${videoIdx}`} />
            ))
          : Array(paginationQuantity)
              .fill(null)
              .map(() => <Skeleton />)}
      </main>

      <footer className="mt-2 flex items-center justify-center">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition 
          hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Load More Videos
        </button>
      </footer>
    </Layout>
  )
}

export default IndexPage
