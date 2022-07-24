import React, { useEffect } from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import RegistryAPI from '../api/registry'
import axios from 'axios'

const RegistryPage = () => {
  useEffect(() => {
    RegistryAPI.getAllFinishers()
  }, [])

  return (
    <Layout location="Registry">
      <Seo title="Registry" />
    </Layout>
  )
}

export default RegistryPage
