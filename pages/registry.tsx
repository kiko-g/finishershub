import React, { useState, useEffect } from 'react'
import { type FinishersClubMember } from '../@types'
import Layout from '../components/layout'
import RegistryAPI from '../utils/api/registry'
import {
  MemberCard,
  DataDisclaimer,
  TotalFinishersDisclaimer,
  MemberCardSkeleton,
} from '../components/registry'

export default function RegistryPage() {
  const [members, setMembers] = useState<FinishersClubMember[]>([])
  const totalFinishers = members
    .map((member) => member.finishers.reduce((a, b) => a + b, 0))
    .flat()
    .reduce((a, b) => a + b, 0)

  const updateMembers = (newEntry: FinishersClubMember) => {
    setMembers(
      members.map((oldEntry: FinishersClubMember) =>
        oldEntry._id === newEntry._id ? newEntry : oldEntry
      )
    )
  }

  useEffect(() => {
    // fetch and set members
    RegistryAPI.getAllFinishers((results: FinishersClubMember[]) => setMembers(results))
  }, [])

  return (
    <Layout location="Registry">
      <main>
        <div className="flex flex-col">
          <h2 className="mb-1 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Finishers Club
          </h2>
          <p className="mb-3 text-lg font-normal">
            Welcome to the Mount Rushmore of finishers. Take a look at the profiles and stats of the
            criminals like never seen before.
          </p>
          <div className="space-y-3">
            <DataDisclaimer />
            <TotalFinishersDisclaimer count={totalFinishers} />
          </div>
        </div>

        <div className="mt-4 mb-16 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {members.length !== 0
            ? members // descending order
                .sort((a, b) => {
                  let x = a.finishers[a.finishers.length - 1]
                  let y = b.finishers[b.finishers.length - 1]

                  return x === y ? a.name.localeCompare(b.name) : y - x
                })
                .map((member: FinishersClubMember, memberIdx: number) => (
                  <MemberCard
                    key={`member-${memberIdx}`}
                    member={member}
                    updateMembers={updateMembers}
                  />
                ))
            : Array(6)
                .fill(0)
                .map((_, idx) => <MemberCardSkeleton key={`member-skeleton-${idx}`} />)}
        </div>
      </main>
    </Layout>
  )
}
