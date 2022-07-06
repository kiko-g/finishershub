import React from 'react'
import Seo from '../components/Seo'
import { Layout } from '../layout/Layout'
import '../styles/pages/about.css'

const AboutPage = () => (
  <Layout location="About" background={true}>
    <Seo title="About" />
  </Layout>
)

export default AboutPage
