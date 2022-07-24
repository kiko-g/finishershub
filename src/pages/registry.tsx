import React, { useEffect } from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import RegistryAPI from '../api/registry'
import axios from 'axios'

const RegistryPage = () => {
  useEffect(() => {
    axios.get(`http://localhost:5000/registry`).then(response => console.log(response.data))
  }, [])

  return (
    <Layout location="Registry">
      <Seo title="Registry" />
    </Layout>
  )
}

export default RegistryPage
