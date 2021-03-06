import React, { useState } from 'react'
import ClaimIdentity from './ClaimIdentity'
import RegistryAPI from '../../api/registry'
import useLocked from '../../hooks/useLocked'
import { RegistryEntry } from '../../@types'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'

type Props = {
  member: RegistryEntry
  updateMembers: Function
}

const MemberCard = ({ member, updateMembers }: Props) => {
  const [locked, setLocked] = useLocked(member)

  const addFinisher = () => {
    RegistryAPI.incrementFinishers(member._id, (newEntry: RegistryEntry) => updateMembers(newEntry))
  }

  const removeFinisher = () => {
    RegistryAPI.decrementFinishers(member._id, (newEntry: RegistryEntry) => updateMembers(newEntry))
  }

  return (
    <div className="member-card">
      <aside className="relative rounded-l-xl md:rounded-xl">
        {member.imgurUrl ? (
          <img
            alt={member.name}
            src={member.imgurUrl}
            className="h-80 w-full lg:h-full lg:max-h-64 lg:w-80 rounded-xl object-cover"
          />
        ) : (
          <div className="h-64 w-full rounded-xl bg-gradient-to-br from-primary via-primary to-primary shadow lg:h-full lg:w-72" />
        )}
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
            <span className="text-5xl font-semibold uppercase text-gray-600 dark:text-white">#{member.finishers}</span>
          </div>

          <div className="flex items-center gap-2">
            <ClaimIdentity lockedHook={[locked, setLocked]} member={member} />

            <button
              disabled={locked}
              onClick={addFinisher}
              className="action bg-sky-800"
              title={locked ? `You need to prove you are ${member.name} first` : `Add 1 finisher to ${member.name}`}
            >
              <span>Add</span>
              <PlusCircleIcon className="h-5 w-5" />
            </button>

            <button
              disabled={locked}
              onClick={removeFinisher}
              className="action bg-rose-800"
              title={locked ? `You need to prove you are ${member.name} first` : `Remove 1 finisher to ${member.name}`}
            >
              <span>Remove</span>
              <MinusCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MemberCard
