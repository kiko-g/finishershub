import React, { useMemo, useState } from "react"
import Image from "next/image"
import ClaimIdentity from "./ClaimIdentity"
import ChangePassword from "./ChangePassword"
import FinisherInfoModal from "./FinisherInfoModal"
import MemberCardSelectArena from "./MemberCardSelectArena"
import RegistryAPI from "../../utils/api/registry"
import useLocked from "../../hooks/useLocked"
import { type FinishersClubMember } from "../../@types"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"

type Props = {
  member: FinishersClubMember
  updateMembers: Function
}

export default function MemberCard({ member, updateMembers }: Props) {
  const arenas = useMemo(
    () => [{ name: "All" }, ...member.finishers.map((count, index) => ({ name: `Warzone ${index + 1}` }))],
    [member],
  )

  const [locked, setLocked] = useLocked(member)
  const [arena, setArena] = useState(arenas[arenas.length - 1])

  const arenaIndex = useMemo(() => arenas.findIndex((a) => a.name === arena.name), [arena, arenas])
  const finisherTotal = useMemo(() => member.finishers.reduce((a, b) => a + b, 0), [member])

  const addFinisher = () => {
    RegistryAPI.incrementFinishers(member._id, arenaIndex - 1, (newEntry: FinishersClubMember) =>
      updateMembers(newEntry),
    )
  }

  const removeFinisher = () => {
    RegistryAPI.decrementFinishers(member._id, arenaIndex - 1, (newEntry: FinishersClubMember) =>
      updateMembers(newEntry),
    )
  }

  return (
    <div className="flex w-full flex-col gap-y-3 rounded-xl bg-lightest p-3 shadow dark:bg-sky-300/5 xl:flex-row xl:gap-y-0">
      <aside className="relative rounded-l-xl md:rounded-xl">
        {member.imgurUrl ? (
          <div className="h-64 w-full rounded shadow xl:h-full xl:max-h-64 xl:w-full xl:max-w-xs 2xl:max-w-md">
            <Image
              width={1920}
              height={1080}
              alt={member.name}
              src={member.imgurUrl}
              className="h-full w-full rounded object-cover"
            />
          </div>
        ) : (
          <div className="h-64 w-full rounded bg-gradient-to-br from-primary via-primary to-primary shadow xl:h-full xl:w-72" />
        )}
      </aside>

      <section className="relative flex w-auto grow flex-col justify-between space-y-6 rounded-r-xl px-1 py-1 text-base font-normal xl:h-auto xl:max-h-full xl:w-3/4 xl:py-0 xl:pl-4 xl:pr-0">
        <div className="flex h-full flex-col justify-between gap-4">
          {/* Header */}
          <div>
            <h3 className="text-2xl font-medium capitalize text-teal-700 dark:text-teal-400">{member.name}</h3>
            <p className="font-normal lowercase tracking-tight text-gray-500 dark:text-white">
              <span className="font-bold">aka&nbsp;</span>
              {member.aliases.map((alias: string, aliasIdx: number) => (
                <span key={`alias-${member.id}.${aliasIdx}`}>
                  {alias}
                  {member.aliases.length - 1 === aliasIdx ? "" : ", "}
                </span>
              ))}
            </p>
          </div>

          {/* Counter */}
          <div className="mb-2 flex flex-col text-gray-600 dark:text-white">
            <FinisherInfoModal />
            <h4 className="text-5xl font-semibold uppercase">
              #{arenaIndex === 0 ? finisherTotal : member.finishers[arenaIndex - 1]}
            </h4>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {/* Add finisher */}
              <button
                disabled={locked || arenaIndex === 0}
                onClick={addFinisher}
                className="inline-flex w-full items-center justify-center gap-x-2 rounded bg-blue-500 p-2 text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                title={locked ? `You need to prove you are ${member.name} first` : `Add 1 finisher to ${member.name}`}
              >
                <span>Add</span>
                <PlusCircleIcon className="h-5 w-5" />
              </button>

              {/* Subtract finisher */}
              <button
                disabled={locked || arenaIndex === 0 || member.finishers[arenaIndex - 1] === 0}
                onClick={removeFinisher}
                className="inline-flex w-full items-center justify-center gap-x-2 rounded bg-rose-600 p-2 text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                title={
                  locked ? `You need to prove you are ${member.name} first` : `Remove 1 finisher to ${member.name}`
                }
              >
                <span>Remove</span>
                <MinusCircleIcon className="h-5 w-5" />
              </button>

              {/* Arena selector */}
              <MemberCardSelectArena arenas={arenas} selectedHook={[arena, setArena]} />
            </div>

            {/* Identity and password */}
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
