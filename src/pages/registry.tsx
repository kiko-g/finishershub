import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import RegistryAPI from '../api/registry'
import { RegistryEntry } from '../@types'
import { MemberCard, DataDisclaimer, MemberCardSkeleton } from '../components/registry'
import '../styles/pages/registry.css'

const RegistryPage = () => {
  const [members, setMembers] = useState<RegistryEntry[]>([])

  const updateMembers = (newEntry: RegistryEntry) => {
    setMembers(members.map((oldEntry: RegistryEntry) => (oldEntry._id === newEntry._id ? newEntry : oldEntry)))
  }

  useEffect(() => {
    // fetch and set members
    RegistryAPI.getAllFinishers((results: RegistryEntry[]) => setMembers(results))
  }, [])

  return (
    <Layout location="Registry">
      <Seo title="Registry" />
      <div className="registry">
        <header>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Finishers Club</h2>
          <section className="mt-4 flex justify-between space-x-2 md:space-x-3">
            <p>The profiles and stats of the criminals like never seen before.</p>
          </section>
          <DataDisclaimer />
        </header>

        <main className="member-list">
          {members.length !== 0
            ? members.map((member: RegistryEntry, memberIdx: number) => (
                <MemberCard key={`member-${memberIdx}`} member={member} updateMembers={updateMembers} />
              ))
            : Array(6)
                .fill(0)
                .map((_, idx) => <MemberCardSkeleton key={`member-skeleton-${idx}`} />)}
        </main>
      </div>
    </Layout>
  )
}

export default RegistryPage
