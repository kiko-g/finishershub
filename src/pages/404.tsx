import * as React from 'react'

import { Layout } from '../layout/Layout'
import Seo from '../components/Seo'

const NotFoundPage = () => (
  <Layout location="Home">
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
