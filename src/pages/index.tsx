import * as React from 'react'
import Seo from '../components/Seo'
import { Layout } from '../layout/Layout'
import { Carousel } from '../components/Carousel'

const IndexPage = () => (
  <Layout location="Home" background={false}>
    <Seo title="Home" />
    <div className="mx-auto w-11/12 px-0 py-2 md:w-5/6 md:p-4">
      <Carousel />
    </div>
  </Layout>
)

export default IndexPage
