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

const Layout: React.FC<Props> = ({ children, location = 'Unknown', background = false }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      className="background flex min-h-screen flex-col scroll-smooth bg-light font-prose 
      font-medium text-dark opacity-[99%] dark:bg-darkest dark:text-white"
    >
      <Navbar location={location} siteTitle={data.site.siteMetadata?.title} />
      {background ? <Background /> : null}
      <div className="container z-10 mx-auto mb-auto p-4">{children}</div>
      <Footer siteTitle={data.site.siteMetadata?.title} />
    </div>
  )
}

export default Layout
