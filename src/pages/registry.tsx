import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import RegistryAPI from '../api/registry'
import { RegistryEntry } from '../@types'

const RegistryPage = () => {
  const [members, setMembers] = useState<RegistryEntry[]>([])

  const getMembers = () => {
    RegistryAPI.getAllFinishers((results: RegistryEntry[]) => {
      setMembers(results)
    })
  }

  useEffect(() => {
    getMembers()
  }, [])

  return (
    <Layout location="Registry">
      <Seo title="Registry" />
      <div>
        {members.map((member: RegistryEntry, idx: number) => (
          <div key={`member-${idx}`}>
            <h2>
              {member.name}: {member.finishers}
            </h2>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default RegistryPage
