import * as React from 'react'
import { Layout } from '../layout/Layout'
import Seo from '../components/Seo'
import { StaticImage } from 'gatsby-plugin-image'

const NotFoundPage = () => (
  <Layout location="Oops">
    <Seo title="404: Not found" />
    <div className="flex flex-col items-center justify-center space-y-2">
      <StaticImage
        src="../images/turtle.jpg"
        alt="Not found display"
        objectFit="cover"
        objectPosition="50% 50%"
        className="aspect-square rounded-xl shadow"
      />
      <div>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
