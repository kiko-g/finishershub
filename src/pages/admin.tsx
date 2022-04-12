import * as React from 'react'
import Seo from '../components/Seo'
import { Layout } from '../layout/Layout'

const AdminPage = () => (
  <Layout location="Admin" background={true}>
    <Seo title="Admin" />
  </Layout>
)

export default AdminPage
