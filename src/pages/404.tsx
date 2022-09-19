import React from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

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
        className="aspect-square w-auto rounded-xl shadow lg:w-96"
      />
      <Link
        to="/"
        className="inline-flex w-full justify-center rounded bg-secondary p-2 text-white
        shadow transition hover:opacity-80 lg:w-96"
      >
        Country roads, take me home!
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
