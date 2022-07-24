import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import RegistryAPI from '../api/registry'
import { RegistryEntry } from '../@types'
import { MemberCard } from '../components/registry'

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
        {members.map((member: RegistryEntry, memberIdx: number) => (
          <MemberCard key={`${member}-memberIdx`} member={member} />
        ))}
      </div>
    </Layout>
  )
}

export default RegistryPage
