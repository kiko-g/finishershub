import React, { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import useLocked from "@/hooks/useLocked"
import RegistryAPI from "@/utils/api/registry"
import { type FinishersClubMember } from "@/@types"
import { Dialog, Listbox, Transition } from "@headlessui/react"
import { Layout } from "@/components/layout"
import {
  CakeIcon,
  CheckIcon,
  ChevronUpDownIcon,
  EyeIcon,
  EyeSlashIcon,
  FingerPrintIcon,
  InformationCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

export default function Registry() {
  const [members, setMembers] = useState<FinishersClubMember[]>([])
  const totalFinishers = useMemo(
    () =>
      members
        .map((member) => member.finishers.reduce((a, b) => a + b, 0))
        .flat()
        .reduce((a, b) => a + b, 0),
    [members],
  )

  const updateMembers = (newEntry: FinishersClubMember) => {
    setMembers(members.map((oldEntry: FinishersClubMember) => (oldEntry._id === newEntry._id ? newEntry : oldEntry)))
  }

  useEffect(() => {
    RegistryAPI.getAllFinishers((results: FinishersClubMember[]) => setMembers(results))
  }, [])

  return (
    <Layout location="Registry">
      <main>
        <div className="flex flex-col">
          <h2 className="mb-1 text-4xl font-bold tracking-tight sm:text-5xl">Finishers Club</h2>
          <p className="mb-3 text-lg font-normal">
            Welcome to the Mount Rushmore of finishers. Take a look at the profiles and stats of the criminals like
            never seen before.
          </p>
          <div className="space-y-3">
            <DataDisclaimer />
            <TotalFinishersDisclaimer count={totalFinishers} />
          </div>
        </div>

        <MembersGrid members={members} updateMembers={updateMembers} />
      </main>
    </Layout>
  )
}

function DataDisclaimer() {
  const [shown, setShown] = React.useState(true)

  if (!shown) return null

  return (
    <div className="flex w-full flex-wrap items-center justify-between rounded border border-primary/90 bg-primary/80 px-3 py-2 text-light dark:border-secondary/40 dark:bg-secondary/40 lg:px-3 lg:py-2">
      <div className="flex w-full items-center justify-between">
        <InformationCircleIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />

        <p className="ml-3 flex-1 text-sm font-normal tracking-tight lg:font-normal lg:tracking-normal">
          <span>If you are a member, prove your identity to update your profile.</span>
        </p>

        <button className="rounded transition hover:bg-white/25" onClick={() => setShown(false)}>
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  )
}

function TotalFinishersDisclaimer({ count }: { count: number }) {
  const [shown, setShown] = React.useState(true)

  const customElement = (
    <span className="inline-flex whitespace-nowrap underline hover:opacity-90">valid finishers</span>
  )

  if (!shown) return null

  return (
    <div className="flex w-full flex-wrap items-center justify-between rounded border border-cyan-600/70 bg-cyan-600/60 px-3 py-2 text-light dark:border-cyan-600/60 dark:bg-cyan-600/50 lg:px-3 lg:py-2">
      <div className="flex w-full flex-1 items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <CakeIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />

          <p className="ml-3 inline-flex flex-1 flex-wrap gap-x-1 text-sm font-normal tracking-tight lg:font-normal lg:tracking-normal">
            Total <FinisherInfoModal custom={customElement} /> by all member across all arenas: <strong>{count}</strong>
          </p>

          <button className="rounded transition hover:bg-white/25" onClick={() => setShown(false)}>
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

function FinisherInfoModal({ custom }: { custom?: JSX.Element }) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={openModal}
        title="Further information about counting"
        className="flex w-min items-center gap-1 text-center font-medium transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {custom ? (
          custom
        ) : (
          <>
            <span className="whitespace-nowrap font-lexend">Lifetime finisher count</span>
            <InformationCircleIcon className="mt-[1px] inline-flex h-4 w-4" />
          </>
        )}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="align-middletext-sm dark:text-whitelg:max-w-[52rem] w-full max-w-xl transform overflow-hidden rounded-2xl bg-lightest p-5 text-left font-normal text-gray-700 shadow-xl transition-all dark:bg-navy lg:p-6 lg:text-base">
                  <div className="flex items-center justify-between gap-x-2">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 tracking-tight text-primary dark:text-white lg:text-2xl lg:tracking-normal"
                    >
                      Lifetime Finisher Count
                    </Dialog.Title>

                    <button
                      onClick={closeModal}
                      className="flex items-center gap-x-1 rounded border border-rose-600/50 bg-rose-600/10 px-2 py-1 text-sm text-rose-800 transition hover:bg-rose-600 hover:text-white dark:bg-rose-600/20 dark:text-white dark:hover:bg-rose-600"
                    >
                      <span>Close</span>
                      <XMarkIcon className="h-4 w-4" />{" "}
                    </button>
                  </div>

                  <div className="mt-3 flex flex-col">
                    <p>
                      The{" "}
                      <strong className="text-primary dark:text-white dark:underline">lifetime finisher count</strong>{" "}
                      is the <strong>sum of all the valid finishing moves</strong> performed by any member of the
                      finishers club. This metric also applies to all players across the world.
                    </p>
                    <p className="mt-3 font-bold">A valid and truthful finisher must meet the following criteria:</p>
                    <ul className="ml-4 mt-1 flex list-disc flex-col gap-y-1 lg:gap-y-0.5">
                      <li>Finishing move is performed on Warzone. ✅</li>
                      <li>Finishing move is performed on non-downed players. ✅</li>
                    </ul>
                    <p className="mt-3 font-bold">Other key notes to keep in mind:</p>
                    <ul className="ml-4 mt-1 flex list-decimal flex-col gap-y-1 lg:gap-y-0.5">
                      <li>
                        Finishing moves on downed players are <strong>not counted</strong> and{" "}
                        <strong>often considered frowned upon</strong>. ⚠️
                      </li>
                      <li>
                        Finishing moves performed on players that have recently used their <strong>self-revive</strong>{" "}
                        are allowed and considered a <strong>noble practice</strong>. 🥇
                      </li>
                      <li>
                        Even though finishing moves performed on arenas like Multiplayer{" "}
                        <strong>do not count towards the lifetime finisher count</strong>, the Finisher Club still
                        highly encourages performing them whenever possible. ℹ️
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 flex w-full items-center justify-end">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center space-x-2 rounded bg-primary px-3 py-2 text-center text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
                      onClick={closeModal}
                    >
                      <span>Got it, thanks!</span>
                      <CheckIcon className="h-5 w-5" />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function MembersGrid({ members, updateMembers }: { members: FinishersClubMember[]; updateMembers: Function }) {
  return (
    <div className="mb-16 mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
      {members.length !== 0
        ? members // descending order
            .sort((a, b) => {
              let x = a.finishers[a.finishers.length - 1]
              let y = b.finishers[b.finishers.length - 1]

              return x === y ? a.name.localeCompare(b.name) : y - x
            })
            .map((member: FinishersClubMember, memberIdx: number) => (
              <MemberCard key={`member-${member._id}`} member={member} updateMembers={updateMembers} />
            ))
        : Array(6)
            .fill(0)
            .map((_, idx) => <MemberCardSkeleton key={`member-skeleton-${idx}`} />)}
    </div>
  )
}

function MemberCard({ member, updateMembers }: { member: FinishersClubMember; updateMembers: Function }) {
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

function MemberCardSkeleton() {
  return (
    <div className="flex w-full flex-col space-y-3 rounded-xl bg-lightest p-3 shadow dark:bg-white/5 xl:flex-row xl:space-y-0">
      <aside className="relative rounded-l-xl md:rounded-xl">
        <div className="h-64 w-full animate-pulse rounded-xl bg-lightish shadow dark:bg-white/20 xl:h-48 xl:w-72" />
      </aside>

      <section
        className="relative flex w-auto grow flex-col justify-between space-y-6 rounded-r-xl 
        px-1 py-1 text-base font-normal xl:h-auto xl:max-h-full xl:w-3/4 xl:py-0 xl:pl-4 xl:pr-0"
      >
        <div className="flex h-48 flex-col justify-between">
          <span className="h-6 w-36 animate-pulse rounded bg-lightish dark:bg-white/20" />
          <span className="h-4 w-24 animate-pulse rounded bg-lightish dark:bg-white/20" />
          <span className="h-4 w-12 animate-pulse rounded bg-lightish dark:bg-white/20" />
          <span className="h-16 w-48 animate-pulse rounded bg-lightish dark:bg-white/20" />

          <div className="flex items-center gap-2">
            <button className="inline-flex h-8 w-20 animate-pulse items-center space-x-2 rounded bg-lightish p-2 text-center text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20"></button>
            <button className="inline-flex h-8 w-20 animate-pulse items-center space-x-2 rounded bg-lightish p-2 text-center text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20"></button>
            <button className="inline-flex h-8 w-20 animate-pulse items-center space-x-2 rounded bg-lightish p-2 text-center text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20"></button>
          </div>
        </div>
      </section>
    </div>
  )
}

function MemberCardSelectArena({
  arenas,
  selectedHook,
}: {
  arenas: any
  selectedHook: [any, Dispatch<SetStateAction<any>>]
}) {
  const [picked, setPicked] = selectedHook

  return (
    <Listbox value={picked} onChange={setPicked}>
      <div className="relative z-20 w-full">
        <Listbox.Button
          as="button"
          className="inline-flex w-full items-center justify-center gap-x-1 rounded bg-teal-600 py-2 pl-3 pr-2 text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="block truncate">{picked.name}</span>
          <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-gray-100 py-2 shadow lg:w-auto">
            {arenas.map((arena: any, arenaIdx: number) => (
              <Listbox.Option
                key={arenaIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-1.5 pl-10 pr-5 ${
                    active ? "bg-teal-700/10 text-teal-700" : "text-gray-800"
                  }`
                }
                value={arena}
              >
                <span className={`block truncate ${picked.name === arena.name ? "font-semibold" : "font-normal"}`}>
                  {arena.name}
                </span>
                {picked.name === arena.name ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

function ChangePassword({
  member,
  lockedHook,
}: {
  member: FinishersClubMember
  lockedHook: [boolean, Dispatch<SetStateAction<boolean>>]
}) {
  const [locked, setLocked] = lockedHook
  const [isOpen, setIsOpen] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [passwordShown, setPasswordShown] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown)
  }

  const submitNewPassword = () => {
    RegistryAPI.updatePassword(member._id, newPassword, () => {
      setLocked(false)
      setNewPassword("")
      setIsOpen(false)
    })
  }

  return (
    <>
      <button
        title={locked ? `You need to claim identity for ${member.name} first` : `Change the password of ${member.name}`}
        onClick={openModal}
        disabled={locked}
        className="inline-flex w-full items-center justify-center gap-x-2 rounded bg-slate-500 p-2 text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-gray-700"
      >
        <span className="whitespace-nowrap">Change password</span>
        <FingerPrintIcon className="h-5 w-5" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-gray-600 shadow-xl transition-all dark:bg-navy dark:text-white">
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-primary dark:text-secondary">
                      Change Password
                    </Dialog.Title>

                    <button
                      onClick={closeModal}
                      className="flex items-center gap-x-1 rounded border border-rose-600/50 bg-rose-600/10 px-2 py-1 text-sm text-rose-800 transition hover:bg-rose-600 hover:text-white dark:bg-rose-600/20 dark:text-white dark:hover:bg-rose-600"
                    >
                      <span>Close</span>
                      <XMarkIcon className="h-4 w-4" />{" "}
                    </button>
                  </div>

                  <p className="mt-2">
                    Type your new password for <strong>{member.name}</strong> and then submit your changes to{" "}
                    <strong>replace the previous one</strong>.
                  </p>

                  <div className="relative mt-3 flex flex-col gap-1">
                    <label htmlFor="password" className="sr-only">
                      New Identity password for <strong>{member.name}</strong>
                    </label>
                    <input
                      required
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      autoComplete="new-password"
                      className="relative block w-full"
                      placeholder="New password"
                      value={newPassword}
                      onKeyDown={(e) => e.key === "Enter" && submitNewPassword()}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordShown}
                      className="absolute right-[11px] top-[11px] rounded-full p-1 text-primary transition hover:bg-primary hover:text-white dark:text-secondary dark:hover:bg-secondary dark:hover:text-white"
                    >
                      {passwordShown ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={submitNewPassword}
                      className="w-full rounded bg-primary p-2 text-white transition hover:opacity-80 dark:bg-secondary"
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function ClaimIdentity({
  member,
  lockedHook,
}: {
  member: FinishersClubMember
  lockedHook: [boolean, Dispatch<SetStateAction<boolean>>]
}) {
  const [locked, setLocked] = lockedHook
  const [isOpen, setIsOpen] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordShown, setPasswordShown] = useState(true)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown)
  }

  const submitPassword = () => {
    if (password === member.code) {
      setPassword("")
      setLocked(false)
      setIsOpen(false)
    } else {
      setPassword("")
      setWrong(true)
      setTimeout(() => setWrong(false), 4000)
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        disabled={!locked}
        title={locked ? `Prove you are ${member.name}` : `You already have access to ${member.name}'s data`}
        className="inline-flex w-full items-center justify-center gap-x-2 rounded bg-slate-500 p-2 text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-gray-700"
      >
        <span className="whitespace-nowrap">Claim identity</span>
        {locked ? <LockClosedIcon className="h-5 w-5" /> : <LockOpenIcon className="h-5 w-5" />}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-gray-600 shadow-xl transition-all dark:bg-navy dark:text-white">
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-primary dark:text-secondary">
                      Claim Identity
                    </Dialog.Title>

                    <button
                      onClick={closeModal}
                      className="flex items-center gap-x-1 rounded border border-rose-600/50 bg-rose-600/10 px-2 py-1 text-sm text-rose-800 transition hover:bg-rose-600 hover:text-white dark:bg-rose-600/20 dark:text-white dark:hover:bg-rose-600"
                    >
                      <span>Close</span>
                      <XMarkIcon className="h-4 w-4" />{" "}
                    </button>
                  </div>

                  <p className="mt-2">
                    Type your password to prove you are <strong>{member.name}</strong> and get access to data controls.
                  </p>

                  <div className="relative mt-3 flex flex-col gap-1 rounded">
                    <label htmlFor="password" className="sr-only">
                      Identity password for <strong>{member.name}</strong>
                    </label>
                    <input
                      required
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      autoComplete="new-password"
                      className="relative block w-full"
                      placeholder="Password"
                      value={password}
                      onKeyDown={(e) => e.key === "Enter" && submitPassword()}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordShown}
                      className="absolute right-[11px] top-[11px] rounded-full p-1 text-primary transition hover:bg-primary hover:text-white dark:text-secondary dark:hover:bg-secondary dark:hover:text-white"
                    >
                      {passwordShown ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>

                  {wrong ? (
                    <p className="mt-0.5 text-sm text-rose-600 dark:text-rose-500">Wrong codephrase. Try again.</p>
                  ) : null}

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={submitPassword}
                      className="w-full rounded bg-primary p-2 text-white transition hover:opacity-80 dark:bg-secondary"
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
