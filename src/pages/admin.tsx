import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/Seo'

export default function AdminPage() {
  return (
    <Layout location="Admin" background={true}>
      <Seo title="Admin" />
    </Layout>
  )
}
