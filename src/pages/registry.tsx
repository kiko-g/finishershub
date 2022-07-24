import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import RegistryAPI from '../api/registry'
import { RegistryEntry } from '../@types'
import { MemberCard, DataDisclaimer } from '../components/registry'
import '../styles/pages/registry.css'

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
      <header>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Finishers Club</h2>
        <section className="mt-4 flex justify-between space-x-2 md:space-x-3">
          <p>The profiles and stats of the criminals like never seen before.</p>
          <div>
            {/* <MuteToggler hook={[muted, setMuted]} />
            <ViewToggler hook={[view, setView]} /> */}
          </div>
        </section>
        <DataDisclaimer />
      </header>

      <div className="xl:grid xl:grid-cols-2 flex flex-col gap-4">
        {members.map((member: RegistryEntry, memberIdx: number) => (
          <MemberCard key={`member-${memberIdx}`} member={member} />
        ))}
      </div>
    </Layout>
  )
}

export default RegistryPage
