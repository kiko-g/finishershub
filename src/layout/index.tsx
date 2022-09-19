import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Background } from './Background'
import { useStaticQuery, graphql } from 'gatsby'

type Props = {
  children: JSX.Element[] | JSX.Element
  location: string
  background?: boolean
  wrapperClassNames?: string
}

const Layout: React.FC<Props> = ({ children, location, background, wrapperClassNames }) => {
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
    <div className="layout background">
      <Navbar location={location} siteTitle={data.site.siteMetadata?.title} />
      {background ? <Background /> : null}
      <div className={`container z-10 mx-auto mb-auto p-4 ${wrapperClassNames}`}>{children}</div>
      <Footer siteTitle={data.site.siteMetadata?.title} />
    </div>
  )
}

Layout.defaultProps = {
  children: null,
  location: 'Unknown',
  background: false,
}

export default Layout
