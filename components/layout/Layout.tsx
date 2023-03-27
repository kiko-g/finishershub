import React from 'react'
import { Background, Footer, Header, Seo } from './'

type Props = {
  children: JSX.Element[] | JSX.Element
  location: string
  background?: boolean
}

export default function Layout({ children, location = 'Unknown', background = false }: Props) {
  const siteTitle = 'Finishers Hub'

  return (
    <>
      <Seo title={location} />
      <div className="flex min-h-screen flex-col scroll-smooth bg-light font-prose font-medium text-gray-800 opacity-[99%] dark:bg-navy dark:text-white">
        <Header location={location} siteTitle={siteTitle} />
        {background ? <Background /> : null}
        <div className="container z-10 mx-auto mt-4 mb-auto max-w-7xl overflow-hidden px-4 py-0">
          {children}
        </div>
        <Footer siteTitle={siteTitle} />
      </div>
    </>
  )
}
