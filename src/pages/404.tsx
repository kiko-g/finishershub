import React from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import { StaticImage } from 'gatsby-plugin-image'

const NotFoundPage = () => (
  <Layout location="Oops">
    <Seo title="Oops" />
    <div className="flex flex-col items-start justify-start space-y-2">
      <div className="font-normal">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">404: Not Found</h2>
        <p>Not much too see here... You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
      <StaticImage
        src="../../static/images/turtle.jpg"
        alt="Not found display"
        objectFit="cover"
        objectPosition="50% 50%"
        className="aspect-square h-auto lg:h-96 rounded-xl shadow"
      />
    </div>
  </Layout>
)

export default NotFoundPage
