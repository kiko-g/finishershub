import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import Layout from '../components/layout'
import useAccessDenied from '../hooks/useAccessDenied'
import AccessModal from '../components/layout/AccessModal'
import { FullAccessBadge, LimitedAccessBadge } from '../components/utils'
import { DummyLockedContent } from '../components/admin'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'

type Member = {
  name: string
}

export default function AdminPage() {
  const members: Member[] = [
    { name: 'Frankie' },
    { name: 'Levels' },
    { name: 'Reicalo' },
    { name: 'David' },
    { name: 'Koba' },
  ]

  const [accessDenied, setAccessDenied] = useAccessDenied()

  const [selected, setSelected] = useState<Member | null>(null)
  const [clipTitle, setClipTitle] = useState('')
  const [pernoca, setPernoca] = useState(false)
  const [scandalous, setScandalous] = useState(false)
  const [sensititveAudio, setSensitiveAudio] = useState(false)

  return (
    <Layout location="Admin">
      <main className="flex flex-col gap-y-3 px-0 lg:px-4">
        <div className="mt-1 flex flex-col justify-between gap-y-2 lg:mt-3 lg:flex-row lg:gap-x-6">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Finishers Management
            </h2>
            <p className="grow text-lg font-normal">
              For members and members only. Let&apos;s build something great, shall we?
            </p>
          </div>
          <div className="mt-1 flex flex-col items-center justify-end gap-2 lg:mt-0 lg:flex-col">
            <LimitedAccessBadge />
            <div className="flex w-full items-center justify-end gap-x-2">
              {accessDenied ? (
                <AccessModal special lockedHook={[accessDenied, setAccessDenied]} />
              ) : null}
            </div>
          </div>
        </div>

        <section className="relative mt-4 lg:mt-0">
          {accessDenied ? (
            <DummyLockedContent />
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              {/* Upload video */}
              <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
                {/* Drag video area */}
                <div
                  className="hidden w-full items-center justify-center self-stretch rounded border-2 border-dashed 
                  border-gray-500 bg-gray-800/5 py-6 dark:border-sky-300/40 dark:bg-sky-200/5 lg:flex"
                >
                  <span className="font-normal text-gray-700 dark:text-gray-200">
                    Drag your video highlight here.
                  </span>
                </div>

                {/* Upload video button */}
                <div className="w-full lg:w-auto">
                  <input className="sr-only" type="file" accept="video/mp4" id="upload-video" />
                  <label
                    htmlFor="upload-video"
                    className="flex cursor-pointer items-center justify-center gap-x-3 rounded border
                  border-blue-500/90 bg-blue-500/60 px-6 py-4 text-white transition hover:bg-blue-500/90 
                  dark:bg-blue-500/40 dark:hover:bg-blue-500/80 lg:px-8 lg:py-6"
                  >
                    <ArrowUpTrayIcon className="h-7 w-7" />
                    <span className="whitespace-nowrap font-normal">Upload your highlight</span>
                  </label>
                </div>
              </div>

              {/* Form for uploaded video */}
              <div
                className="flex h-full w-full flex-col gap-4 rounded border border-gray-500/0 
                bg-white px-4 py-4 dark:border-sky-300/5 dark:bg-sky-200/5 lg:flex-row"
              >
                {/* Desktop image */}
                <Image
                  alt="Art"
                  width={512}
                  height={512}
                  src="https://images.unsplash.com/photo-1568158951683-b5dadda4cd8a"
                  className="hidden max-h-[28rem] rounded object-cover lg:flex"
                />

                <form className="flex w-full flex-col items-center justify-between gap-4">
                  <div className="flex w-full flex-col gap-y-4">
                    {/* Title */}
                    <label htmlFor="clipTitle" className="block text-sm font-medium">
                      <span>Title of your clip</span>
                      <input
                        required
                        id="clipTitle"
                        type="text"
                        name="clipTitle"
                        value={clipTitle}
                        onChange={(e) => setClipTitle(e.target.value)}
                        placeholder="Que escândalo na verdoca!"
                        className="mt-1 w-full rounded border border-gray-300 bg-gray-50 px-3 py-3 
                        text-base font-normal placeholder:font-normal placeholder:text-gray-400
                        hover:border-teal-600/80 hover:bg-teal-600/10 focus:border-teal-600
                        focus:accent-teal-600 focus:ring-teal-600 focus:ring-offset-0 
                        dark:border-sky-300/10 dark:bg-sky-200/5 dark:placeholder:text-gray-300 
                        dark:hover:bg-sky-400/10 dark:focus:border-sky-500"
                      />
                    </label>

                    {/* Protagonist */}
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative">
                        <Listbox.Label className="block text-sm font-medium">
                          Protagonist
                        </Listbox.Label>
                        <Listbox.Button
                          as="button"
                          className="relative mt-1 w-full rounded border border-gray-300 bg-gray-50 
                          py-3 pl-3 pr-10 text-left transition hover:border-teal-600/50 hover:bg-teal-600/20 
                          dark:border-sky-300/10 dark:bg-sky-200/5 dark:hover:border-sky-400/50 dark:hover:bg-sky-400/20"
                        >
                          {selected !== null ? (
                            <span className="block truncate font-normal">{selected.name}</span>
                          ) : (
                            <span className="block truncate font-normal text-gray-500 dark:text-gray-400">
                              Select a member
                            </span>
                          )}
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options
                            className="absolute mt-2 max-h-72 w-full overflow-auto rounded 
                          bg-white py-3 text-base shadow ring-opacity-5 
                          dark:bg-darkest/95 sm:text-sm"
                          >
                            {members.map((member, memberIdx) => {
                              const isSelected = selected !== null && selected.name === member.name
                              return (
                                <Listbox.Option
                                  key={memberIdx}
                                  className={({ active }) =>
                                    classNames(
                                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                                      isSelected
                                        ? 'bg-teal-300/30 font-semibold text-teal-700 hover:opacity-80 dark:bg-sky-300/80 dark:text-white'
                                        : '',
                                      active
                                        ? 'bg-teal-100 text-teal-900 dark:bg-sky-600/50 dark:text-white'
                                        : ''
                                    )
                                  }
                                  value={member}
                                >
                                  <>
                                    <span
                                      className={`block truncate ${
                                        isSelected ? 'font-semibold' : 'font-normal'
                                      }`}
                                    >
                                      {member.name}
                                    </span>
                                    {isSelected ? (
                                      <>
                                        <span
                                          className="absolute inset-y-0 left-0 flex items-center pl-3 
                                        text-teal-700 dark:text-white"
                                        >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      </>
                                    ) : null}
                                  </>
                                </Listbox.Option>
                              )
                            })}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>

                    {/* Parameters  */}
                    <div className="flex flex-col gap-y-1">
                      {/* Label */}
                      <span className="block text-sm font-medium">Parameters</span>

                      {/* Checkboxes */}
                      <div
                        className="flex flex-col items-start gap-y-3 rounded border border-gray-300 
                      bg-gray-50 px-4 py-4 dark:border-sky-300/10 dark:bg-sky-200/5"
                      >
                        {/* Pernoca */}
                        <div className="flex w-full items-center justify-start gap-x-2.5 text-sm">
                          <input
                            type="checkbox"
                            id="pernoca-checkbox"
                            checked={sensititveAudio}
                            onChange={(e) => setSensitiveAudio(e.target.checked)}
                          />
                          <label
                            htmlFor="pernoca-checkbox"
                            className="block w-full cursor-pointer text-sm font-normal lg:text-base"
                          >
                            Pernoca POV
                          </label>
                        </div>

                        {/* Scandalous Clip */}
                        <div className="flex w-full items-center justify-start gap-x-2.5 text-sm">
                          <input
                            type="checkbox"
                            id="scandal-checkbox"
                            checked={scandalous}
                            onChange={(e) => setScandalous(e.target.checked)}
                          />
                          <label
                            htmlFor="scandal-checkbox"
                            className="block w-full cursor-pointer text-sm font-normal lg:text-base"
                          >
                            Scandalous Clip
                          </label>
                        </div>

                        {/* Should be muted */}
                        <div className="flex w-full items-center justify-start gap-x-2.5 text-sm">
                          <input
                            type="checkbox"
                            id="muted-checkbox"
                            checked={pernoca}
                            onChange={(e) => setPernoca(e.target.checked)}
                          />
                          <label
                            htmlFor="muted-checkbox"
                            className="block w-full cursor-pointer text-sm font-normal lg:text-base"
                          >
                            Sensitive audio content
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded border border-teal-600/90 bg-teal-600/60 px-4 py-2 
                  text-white transition hover:bg-teal-600/90 dark:bg-teal-600/40 dark:hover:bg-teal-600/80"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    </Layout>
  )
}
