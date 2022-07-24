import React, { useEffect } from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import RegistryAPI from '../api/registry'

const RegistryPage = () => {
  const getAll = () => {
    RegistryAPI.getAllFinishers()
  }

  return (
    <Layout location="Registry">
      <Seo title="Registry" />
      <button onClick={getAll}>FETCH ALL AND LOG</button>
    </Layout>
  )
}

export default RegistryPage
