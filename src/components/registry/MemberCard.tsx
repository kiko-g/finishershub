import React, { useMemo, useState } from 'react'
import ClaimIdentity from './ClaimIdentity'
import ChangePassword from './ChangePassword'
import FinisherInfoModal from './FinisherInfoModal'
import MemberCardSelectArena from './MemberCardSelectArena'
import RegistryAPI from '../../api/registry'
import useLocked from '../../hooks/useLocked'
import { FinishersClubMember } from '../../@types'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

type Props = {
  member: FinishersClubMember
  updateMembers: Function
}

export default function MemberCard({ member, updateMembers }: Props) {
  const arenas = useMemo(
    () => [{ name: 'All' }, ...member.finishers.map((count, index) => ({ name: `Warzone ${index + 1}` }))],
    [member]
  )

  const [locked, setLocked] = useLocked(member)
  const [arena, setArena] = useState(arenas[arenas.length - 1])

  const arenaIndex = useMemo(() => arenas.findIndex(a => a.name === arena.name), [arena])
  const finisherTotal = useMemo(() => member.finishers.reduce((a, b) => a + b, 0), [member])

  const addFinisher = () => {
    RegistryAPI.incrementFinishers(member._id, arenaIndex - 1, (newEntry: FinishersClubMember) =>
      updateMembers(newEntry)
    )
  }

  const removeFinisher = () => {
    RegistryAPI.decrementFinishers(member._id, arenaIndex - 1, (newEntry: FinishersClubMember) =>
      updateMembers(newEntry)
    )
  }

  return (
    <div
      className="flex w-full flex-col space-y-3 rounded-xl 
    bg-lightest p-3 shadow dark:bg-dark lg:flex-row lg:space-y-0"
    >
      <aside className="relative rounded-l-xl md:rounded-xl">
        {member.imgurUrl ? (
          <img
            alt={member.name}
            src={member.imgurUrl}
            className="h-80 w-full rounded-xl object-cover lg:h-full lg:max-h-64 lg:w-80"
          />
        ) : (
          <div className="h-64 w-full rounded-xl bg-gradient-to-br from-primary via-primary to-primary shadow lg:h-full lg:w-72" />
        )}
      </aside>

      <section
        className="relative flex w-auto grow flex-col justify-between space-y-6 rounded-r-xl px-1 py-1 
        text-base font-normal lg:h-auto lg:max-h-full lg:w-3/4 lg:py-0 lg:pl-4 lg:pr-0"
      >
        <div className="flex h-full flex-col justify-between gap-4">
          {/* Header */}
          <header>
            <p className="text-3xl font-semibold capitalize text-primary dark:text-teal-600">{member.name}</p>
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

          {/* Counter */}
          <div className="mb-2 flex flex-col text-gray-600 dark:text-white">
            <FinisherInfoModal />
            <p className="text-5xl font-semibold uppercase">
              #{arenaIndex === 0 ? finisherTotal : member.finishers[arenaIndex - 1]}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                disabled={locked || arenaIndex === 0}
                onClick={addFinisher}
                className="inline-flex items-center space-x-2 rounded bg-sky-800 p-2 text-center text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                title={locked ? `You need to prove you are ${member.name} first` : `Add 1 finisher to ${member.name}`}
              >
                <span>Add</span>
                <PlusCircleIcon className="h-5 w-5" />
              </button>
              <button
                disabled={locked || arenaIndex === 0 || member.finishers[arenaIndex - 1] === 0}
                onClick={removeFinisher}
                className="inline-flex items-center space-x-2 rounded bg-rose-800 p-2 text-center text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                title={
                  locked ? `You need to prove you are ${member.name} first` : `Remove 1 finisher to ${member.name}`
                }
              >
                <span>Remove</span>
                <MinusCircleIcon className="h-5 w-5" />
              </button>
              <MemberCardSelectArena arenas={arenas} selectedHook={[arena, setArena]} />
            </div>
            <div className="flex items-center gap-2">
              <ClaimIdentity lockedHook={[locked, setLocked]} member={member} />
              <ChangePassword lockedHook={[locked, setLocked]} member={member} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
