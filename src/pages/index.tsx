import api from '../api/twitch'
import React, { useState, useEffect } from 'react'
import Seo from '../components/Seo'
import { ClipsResponse } from '../@types'
import { Layout } from '../layout/Layout'
import { useStaticQuery, graphql } from 'gatsby'
import { Carousel } from '../components/Carousel'
import { ViewTogglers } from '../components/ViewTogglers'

const IndexPage = () => {
  const [view, setView] = useState(false)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    api.getClips((response: ClipsResponse) => {
      console.log(response.data)
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
      <div className={`mt-4 grid grid-cols-1 gap-4 py-2 md:mt-0 md:gap-6 md:py-4 ${view ? 'md:grid-cols-1' : 'md:grid-cols-3'}`}>
        {videos.map((video, videoIdx) => (
          <Carousel video={video} key={`video-${videoIdx}`} />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
