import React, { useState } from 'react'
import { RegistryEntry } from '../../@types'
import { FingerPrintIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'

type Props = {
  member: RegistryEntry
}

const MemberCard = ({ member }: Props) => {
  const [locked, setLocked] = useState(true)

  return (
    <div className="member-card">
      <aside className="relative rounded-l-xl md:rounded-xl">
        <div className="h-64 w-full rounded-xl bg-gradient-to-br from-primary via-primary to-primary shadow lg:h-full lg:w-72"></div>
      </aside>

      <section className="relative flex w-auto grow flex-col justify-between space-y-6 rounded-r-xl px-1 py-1 text-base font-normal lg:h-auto lg:max-h-full lg:w-3/4 lg:py-0 lg:pl-4 lg:pr-0">
        <div className="flex h-full flex-col justify-between gap-4">
          <header>
            <p className="text-3xl font-semibold capitalize text-primary dark:text-white">{member.name}</p>
            <p className="font-normal lowercase text-gray-500 dark:text-white">
              <span className="font-bold">aka&nbsp;</span>
              {member.aliases.map((alias: string, aliasIdx: number) => (
                <span key={`alias-${member.id}.${aliasIdx}`}>
                  {alias}
                  {member.aliases.length - 1 === aliasIdx ? '' : ', '}
                </span>
              ))}
            </p>
          </header>
          <div>
            <p className="font-normal text-gray-600 dark:text-white">Lifetime finisher count</p>
            <span className="text-6xl font-semibold uppercase text-gray-600 dark:text-white">#{member.finishers}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={!locked}
              title={locked ? `Prove you are ${member.name}` : `You already have access to ${member.name}'s data`}
              className="action bg-primary"
            >
              <span>Claim identity</span>
              <FingerPrintIcon className="h-4 w-4" />
            </button>

            <button
              disabled={locked}
              className="action bg-sky-800"
              title={locked ? `You need to prove you are ${member.name} first` : `Add 1 finisher to ${member.name}`}
            >
              <span>Add</span>
              <PlusCircleIcon className="h-4 w-4" />
            </button>

            <button
              disabled={locked}
              className="action bg-rose-800"
              title={locked ? `You need to prove you are ${member.name} first` : `Remove 1 finisher to ${member.name}`}
            >
              <span>Remove</span>
              <MinusCircleIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MemberCard
