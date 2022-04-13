import api from '../api/twitch'
import { useStaticQuery, graphql } from 'gatsby'
import React, { useState, useEffect } from 'react'
import Seo from '../components/Seo'
import { ClipsResponse } from '../@types'
import { Layout } from '../layout/Layout'
import { VideoClip } from '../components/VideoClip'
import { Pagination } from '../components/Pagination'
import { ViewTogglers } from '../components/ViewTogglers'

const IndexPage = () => {
  const [view, setView] = useState(false)
  const [cursor, setCursor] = useState('')
  const [videos, setVideos] = useState([])

  useEffect(() => {
    api.getClips((response: ClipsResponse) => {
      setCursor(response.pagination.cursor)
      setVideos(response.data.map(({ embed_url }) => embed_url))
    })
  }, [])

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
        {videos.map((video, videoIdx) => (
          <VideoClip video={video} key={`video-${videoIdx}`} />
        ))}
      </main>

      <footer>
        <Pagination api={api} />
      </footer>
    </Layout>
  )
}

export default IndexPage
