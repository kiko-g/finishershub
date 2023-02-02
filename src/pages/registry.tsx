import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import RegistryAPI from '../api/registry'
import { FinishersClubMember } from '../@types'
import { MemberCard, DataDisclaimer, TotalFinishersDisclaimer, MemberCardSkeleton } from '../components/registry'

const RegistryPage = () => {
  const [members, setMembers] = useState<FinishersClubMember[]>([])
  const totalFinishers = members
    .map(member => member.finishers.reduce((a, b) => a + b, 0))
    .flat()
    .reduce((a, b) => a + b, 0)

  const updateMembers = (newEntry: FinishersClubMember) => {
    setMembers(members.map((oldEntry: FinishersClubMember) => (oldEntry._id === newEntry._id ? newEntry : oldEntry)))
  }

  useEffect(() => {
    // fetch and set members
    RegistryAPI.getAllFinishers((results: FinishersClubMember[]) => setMembers(results))
  }, [])

  return (
    <Layout location="Registry">
      <Seo title="Registry" />
      <div className="mt-2">
        <header>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Finishers Club</h2>
          <section className="mt-4">
            <p>
              Welcome to the Mount Rushmore of finishers. Take a look at the profiles and stats of the criminals like
              never seen before.
            </p>
          </section>
          <DataDisclaimer />
          <TotalFinishersDisclaimer count={totalFinishers} />
        </header>

        <main className="mb-16 flex flex-col gap-4 2xl:grid 2xl:grid-cols-2">
          {members.length !== 0
            ? members // descending order
                .sort((a, b) => {
                  let x = a.finishers[a.finishers.length - 1]
                  let y = b.finishers[b.finishers.length - 1]

                  return x === y ? a.name.localeCompare(b.name) : y - x
                })
                .map((member: FinishersClubMember, memberIdx: number) => (
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
