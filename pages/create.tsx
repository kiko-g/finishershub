import React, { Fragment, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { Listbox, Transition } from '@headlessui/react'
import useAccessDenied from '../hooks/useAccessDenied'
import { Layout, AccessModal, ComingSoon } from '../components/layout'
import { FullAccessBadge, LimitedAccessBadge } from '../components/utils'
import { DummyLockedContent } from '../components/videos'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type Member = {
  name: string
}

export default function CreatePage() {
  const wip = true
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
    <Layout location="Create">
      <main className="flex flex-1 flex-col gap-y-3 px-0 lg:px-4">
        <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:gap-x-6">
          <div className="text-lg font-normal">
            <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Upload your finishers
              </h2>
              {accessDenied ? <LimitedAccessBadge /> : <FullAccessBadge />}
            </div>
            <p className="mt-2">
              This is where we build memories. History needs to be written. For members and members
              only.
            </p>
          </div>
        </div>

        {wip ? (
          <section className="mb-24 mt-12">
            <ComingSoon />
          </section>
        ) : (
          <section className="relative mt-4 lg:mt-0">
            {accessDenied ? (
              <DummyLockedContent />
            ) : (
              <div className="flex w-full flex-col items-center justify-center gap-4">
                {/* Upload video */}
                <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
                  {/* Drag video area */}
                  <div
                    className="hidden w-full items-center justify-center self-stretch rounded border border-dashed 
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
                bg-white px-4 py-4 dark:border-gray-200/10 dark:bg-gray-100/5 lg:flex-row"
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
                          className="mt-1 w-full text-base"
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
                            className="leinput relative mt-1 flex w-full justify-between bg-gray-50 dark:bg-gray-100/5"
                          >
                            {selected !== null ? (
                              <span className="block truncate font-light text-gray-400 dark:text-gray-400">
                                {selected.name}
                              </span>
                            ) : (
                              <span className="block truncate font-light text-gray-400 dark:text-gray-400">
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
                                const isSelected =
                                  selected !== null && selected.name === member.name
                                return (
                                  <Listbox.Option
                                    key={memberIdx}
                                    className={({ active }) =>
                                      classNames(
                                        'relative cursor-pointer select-none py-2 pl-10 pr-4',
                                        isSelected
                                          ? `bg-primary/75 font-semibold text-white 
                                        hover:opacity-80 dark:bg-secondary/75 dark:text-white`
                                          : ``,
                                        active
                                          ? `bg-primary/20 text-primary dark:bg-secondary/50 
                                        dark:text-white`
                                          : ``
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
                                        text-white dark:text-white"
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
                      bg-gray-50 px-4 py-4 dark:border-gray-200/10 dark:bg-gray-100/5"
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
                      className="w-full rounded border border-primary/90 bg-primary/60 px-4 py-2 
                  text-white transition hover:bg-primary/90 dark:border-secondary/90
                  dark:bg-secondary/40 dark:hover:bg-secondary/80"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </Layout>
  )
}
