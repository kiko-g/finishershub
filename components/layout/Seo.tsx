import React from 'react'
import Head from 'next/head'

type Props = {
  title: string
}

export default function Seo({ title }: Props) {
  const siteTitle = `Finishers Hub`
  const author = `kikogoncalves`
  const description = `The place for all finisher related content. Chaotic, outrageous, lawless on the fence of criminality. Perfectly unbalanced. As all things should be.`

  const meta = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:title`,
      content: siteTitle,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: author || ``,
    },
    {
      name: `twitter:title`,
      content: siteTitle,
    },
    {
      name: `twitter:description`,
      content: description,
    },
  ]

  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
    </Head>
  )
}
