import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type MetaProps = JSX.IntrinsicElements['meta']

interface Props {
  description?: string
  lang?: string
  meta?: MetaProps[] | []
  title: string
}

export default function Seo({ description = '', lang = 'en', meta = [], title = '' }: Props) {
  // See: https://www.gatsbyjs.com/docs/use-static-query/
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const author = siteMetadata?.author
  const siteTitle = siteMetadata?.title
  const metaDescription = description === '' ? siteMetadata?.description : description

  return (
    <Helmet
      title={title}
      titleTemplate={siteTitle ? `%s | ${siteTitle}` : null}
      htmlAttributes={{ lang }}
      meta={[
        ...meta,
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
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
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]}
    />
  )
}
