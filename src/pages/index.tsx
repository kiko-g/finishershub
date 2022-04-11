import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Seo from '../components/Seo'
import { Layout } from '../layout/Layout'
import { Carousel } from '../components/Carousel'

const IndexPage = () => {
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
        <p className="mt-4 text-lg font-normal">{data.site.siteMetadata?.description}</p>
      </header>
      <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-3 md:gap-6 md:py-4">
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
      </div>
    </Layout>
  )
}

export default IndexPage
