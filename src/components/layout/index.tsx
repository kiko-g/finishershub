import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Background } from './Background'
import { useStaticQuery, graphql } from 'gatsby'

type Props = {
  children: JSX.Element[] | JSX.Element
  location: string
  background?: boolean
}

export default function Layout({ children, location = 'Unknown', background = false }: Props) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <div
      className="flex min-h-screen flex-col scroll-smooth bg-light font-prose 
      font-medium text-gray-800 opacity-[99%] dark:bg-darkest dark:text-white"
    >
      <Navbar location={location} siteTitle={siteTitle} />
      {background ? <Background /> : null}
      <div className="container z-10 mx-auto mb-auto px-4 py-0">{children}</div>
      <Footer siteTitle={siteTitle} />
    </div>
  )
}
