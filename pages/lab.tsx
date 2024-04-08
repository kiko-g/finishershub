import React, { Dispatch, Fragment, SetStateAction, useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import classNames from "classnames"
import type { CatalogueItemStatus, CatalogueItem as CatalogueItemType } from "@/@types"
import { strIncludes } from "@/utils"
import { Layout } from "@/components/layout"
import { Dialog, Transition } from "@headlessui/react"
import { ArrowTopRightOnSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { BoltIcon, LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/solid"

export default function Lab() {
  return (
    <Layout location="Lab">
      <main className="mb-12 flex flex-col gap-6 px-0 lg:px-4">
        <header className="flex flex-col justify-center gap-2">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Finishers Lab</h2>
          <p className="grow text-lg font-normal">
            Resources and information related to the sick profession of performing finishers.
          </p>
        </header>

        <div className="flex flex-col py-3">
          <div className="flex items-start justify-between">
            {/* Catalogue Header */}
            <div>
              <h2 className="mb-1 text-2xl font-bold tracking-tight sm:text-3xl">MW2 Finishers Catalogue</h2>
              <p className="mb-4 grow text-base font-normal">
                A comprehensive list of all the finishers in MW2 (released in 2022).
              </p>
            </div>

            {/* Catalogue Buttons */}
            <div>
              <Link
                target="_blank"
                href="https://docs.google.com/spreadsheets/u/0/d/140Cg-yQp-X84AX0LAgkANIngvCSUKgXUhze9mOyi_mk/htmlview"
                className="flex items-center justify-center gap-2 font-normal transition hover:opacity-80"
              >
                <ArrowTopRightOnSquareIcon className="h-8 w-8" />
              </Link>
            </div>
          </div>

          <Catalogue />
        </div>
      </main>
    </Layout>
  )
}

function Catalogue() {
  const [filteredName, setFilteredName] = useState("")
  const [headers, setHeaders] = useState<string[]>([])
  const [catalogue, setCatalogue] = useState<(string | number)[][]>([])
  const ready = useMemo(() => headers.length > 0 && catalogue.length > 0, [headers, catalogue])
  const catalogueFiltered = useMemo(
    () => catalogue.filter((item) => strIncludes(item[0] as string, filteredName)),
    [catalogue, filteredName],
  )

  useEffect(() => {
    fetch("/api/catalogue").then((res) => {
      res.json().then((data) => {
        setHeaders(data.table.headers)
        setCatalogue(data.table.rows)
      })
    })
  }, [])

  return ready ? (
    <div className="flex flex-col gap-y-4">
      <FilterByName hook={[filteredName, setFilteredName]} />
      <CatalogueGrid catalogue={catalogueFiltered} />
    </div>
  ) : (
    <Loading />
  )
}

function CatalogueGrid({ catalogue }: { catalogue: (string | number)[][] }) {
  const [chosen, setChosen] = useState<string | null>(null)

  return (
    <div>
      <p className="mb-1">{catalogue.length} results matching filtering options.</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {catalogue.map((row, index) => {
          const finisher: CatalogueItemType = {
            name: row[0] as string,
            source: row[1] as string,
            game: row[2] as string,
            unlocked: row[3] as CatalogueItemStatus,
            accurate: row[4] as CatalogueItemStatus,
            ttrk: row[5] as number,
            ttca: row[6] as number,
            slippery: row[7] as 1 | 2 | 3 | 4 | 5,
            ledgeDanger: row[8] as 1 | 2 | 3 | 4 | 5,
            score: row[9] as number,
            video: row[10] as string,
          }

          return <CatalogueItem key={`item-${index}`} item={finisher} chosen={chosen} setChosen={setChosen} />
        })}
      </div>
    </div>
  )
}

function FilterByName({ hook }: { hook: [string, React.Dispatch<React.SetStateAction<string>>] }) {
  const [searchQuery, setSearchQuery] = hook

  return (
    <input
      type="search"
      placeholder="Search by finishing move name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )
}

function Loading() {
  return (
    <div className="flex h-64 items-center justify-center rounded border border-primary/50 bg-primary/10 dark:border-secondary/50 dark:bg-secondary/10">
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="-ml-1 mr-3 h-12 w-12 animate-spin text-primary dark:text-secondary"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
      3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}

type CatalogueItemProps = {
  item: CatalogueItemType
  chosen: string | null
  setChosen: Dispatch<SetStateAction<string | null>>
}

function CatalogueItem({ item, chosen, setChosen }: CatalogueItemProps) {
  const uncertainty = item.accurate === "Yes" ? 0.1 : item.accurate === "Almost" ? 0.2 : 0.4
  const isChosen = useMemo(() => chosen === item.name, [chosen, item.name])
  const speedText =
    Number(item.ttrk) < 2.3 ? "Ultra" : Number(item.ttrk) < 2.8 ? "Fast" : Number(item.ttrk) < 3 ? "Ok" : "Slow"

  const slipperyText =
    Number(item.slippery) === 1
      ? "A"
      : Number(item.slippery) === 2
        ? "B"
        : Number(item.slippery) === 3
          ? "C"
          : Number(item.slippery) === 4
            ? "D"
            : "E"

  const ledgeDangerText =
    Number(item.ledgeDanger) === 1
      ? "A"
      : Number(item.ledgeDanger) === 2
        ? "B"
        : Number(item.ledgeDanger) === 3
          ? "C"
          : Number(item.ledgeDanger) === 4
            ? "D"
            : "E"

  const exitFocus = () => setChosen(null)

  return (
    <>
      {/* Card View */}
      <div
        onClick={() => setChosen(isChosen ? null : item.name)}
        className={classNames(
          "flex h-auto cursor-pointer flex-wrap items-start justify-center gap-3 rounded border p-3 lg:h-[12rem] lg:flex-nowrap",
          isChosen
            ? "border-pink-600 bg-rose-600/10 hover:bg-rose-600/5 dark:bg-pink-600/40 dark:hover:bg-pink-600/25"
            : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10 dark:border-secondary/20 dark:bg-secondary/10 dark:hover:border-secondary dark:hover:bg-secondary/20",
        )}
      >
        {item.video ? (
          <video
            loop
            muted
            autoPlay
            controls={false}
            preload="preload"
            className="aspect-video w-full self-stretch rounded object-cover lg:w-auto"
          >
            <source src={item.video} type="video/mp4" />
          </video>
        ) : (
          <div className="flex aspect-video w-full rounded bg-gradient-to-br from-slate-400 to-slate-500 dark:from-blue-500 dark:to-blue-600 lg:h-full lg:w-auto" />
        )}

        <section className="flex h-full w-full items-start justify-between">
          {/* Left (name, source, ttrk, score) */}
          <div className="flex h-auto w-full flex-col justify-between lg:h-full">
            <div className="flex flex-col">
              <p className="font-lexend font-light tracking-tight">{item.name}</p>
              <p
                title="This information can be wrong at times"
                className="-mt-0.5 text-sm font-light tracking-tight text-gray-500 dark:text-gray-400"
              >
                {item.source}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-lexend text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
                {item.ttrk} ± {uncertainty}s
              </p>
              <div className="flex gap-1.5">
                <span
                  title="TTRK Speed Badge"
                  className={classNames(
                    "px-2 py-1 text-xs font-normal text-white",
                    speedText === "Ultra"
                      ? "bg-blue-600"
                      : speedText === "Fast"
                        ? "bg-teal-500"
                        : speedText === "Ok"
                          ? "bg-amber-500"
                          : "bg-rose-600",
                  )}
                >
                  {speedText}
                </span>
                <span
                  title="Finishing Move Score Badge"
                  className="bg-slate-700 px-2 py-1 text-xs font-normal text-white dark:bg-slate-500"
                >
                  {item.score}%
                </span>
                <span
                  title="MW2 Badge"
                  className={classNames(
                    "self-end bg-green-700 px-2 py-1 text-xs font-normal text-white dark:bg-slate-500",
                    item.game === "MW2" && "bg-green-700",
                    item.game === "MW3" && "bg-red-700",
                  )}
                >
                  MW2
                </span>
              </div>
            </div>
          </div>

          {/* Right (symbols) */}
          <div className="flex flex-col gap-1">
            <span
              title="Ledge Danger Class"
              className={classNames(
                "flex h-5 w-5 items-center justify-center rounded-full p-[0.2rem] lg:h-6 lg:w-6",
                ledgeDangerText === "A"
                  ? "bg-blue-500"
                  : ledgeDangerText === "B"
                    ? "bg-teal-500"
                    : ledgeDangerText === "C"
                      ? "bg-amber-500"
                      : ledgeDangerText === "D"
                        ? "bg-orange-500"
                        : "bg-rose-600",
              )}
            >
              <span className="h-4 w-4 text-center text-xs font-normal text-white">{ledgeDangerText}</span>
            </span>
            <span
              title="Slippery Class"
              className={classNames(
                "flex h-5 w-5 items-center justify-center rounded-full p-[0.2rem] lg:h-6 lg:w-6",
                slipperyText === "A"
                  ? "bg-blue-500"
                  : slipperyText === "B"
                    ? "bg-teal-500"
                    : slipperyText === "C"
                      ? "bg-amber-500"
                      : slipperyText === "D"
                        ? "bg-orange-500"
                        : "bg-rose-600",
              )}
            >
              <span className="h-4 w-4 text-center text-xs font-normal text-white">{slipperyText}</span>
            </span>
            <span
              title="Accuracy of Measurement Badge"
              className={classNames(
                "flex h-5 w-5 items-center justify-center rounded-full p-1 lg:h-6 lg:w-6",
                item.accurate === "Yes" ? "bg-teal-500" : item.accurate === "Almost" ? "bg-amber-500" : "bg-rose-600",
              )}
            >
              {<BoltIcon className="h-3.5 w-3.5 text-white" />}
            </span>
            <span
              title="Unlocked by a FH member Badge"
              className={classNames(
                "flex h-5 w-5 items-center justify-center rounded-full p-1 lg:h-6 lg:w-6",
                item.unlocked === "Yes" ? "bg-teal-500" : item.unlocked === "Almost" ? "bg-amber-500" : "bg-rose-600",
              )}
            >
              {<LockClosedIcon className="h-3.5 w-3.5 text-white" />}
            </span>
          </div>
        </section>
      </div>

      {/* Focused View */}
      <Transition appear show={isChosen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={exitFocus}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs dark:bg-white/10" />
          </Transition.Child>

          <div className="fixed right-0 top-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex h-screen w-full transform flex-col justify-between gap-4 overflow-scroll bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-navy md:max-w-xl">
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between">
                      <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-gray-800 dark:text-white">
                        {item.name}
                      </Dialog.Title>
                      <button
                        onClick={exitFocus}
                        className="flex items-center gap-x-1 bg-pink-600/20 px-2 py-2 text-sm text-pink-800 transition hover:bg-pink-600 hover:text-white dark:bg-pink-600/40 dark:text-white dark:hover:bg-pink-600"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                      Source of finishing move:{" "}
                      <strong title="This information can be wrong at times">{item.source}</strong>
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <div
                        title="Accuracy of Measurement Badge"
                        className={classNames(
                          "flex items-center gap-2 px-3 py-2 text-sm font-light text-white",
                          item.accurate === "Yes"
                            ? "bg-teal-500"
                            : item.accurate === "Almost"
                              ? "bg-amber-500"
                              : "bg-rose-600",
                        )}
                      >
                        <span>Accuracy</span>
                        <BoltIcon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span
                        title="Unlocked by a FH member Badge"
                        className={classNames(
                          "flex items-center gap-2 px-3 py-2 text-sm font-light text-white",
                          item.unlocked === "Yes"
                            ? "bg-teal-500"
                            : item.unlocked === "Almost"
                              ? "bg-amber-500"
                              : "bg-rose-600",
                        )}
                      >
                        <span>{item.unlocked === "Yes" ? "Unlocked" : "Locked"}</span>
                        <LockClosedIcon className="h-3.5 w-3.5 text-white" />
                      </span>
                      <div
                        title="TTRK Speed Badge"
                        className={classNames(
                          "px-3 py-2 text-sm font-light text-white",
                          speedText === "Ultra"
                            ? "bg-blue-600"
                            : speedText === "Fast"
                              ? "bg-teal-500"
                              : speedText === "Ok"
                                ? "bg-amber-500"
                                : "bg-rose-600",
                        )}
                      >
                        {speedText}
                      </div>

                      <div
                        title="Finishing Move Score Badge"
                        className="bg-slate-700 px-3 py-2 text-sm font-light text-white dark:bg-slate-500"
                      >
                        {item.score}/100
                      </div>
                    </div>

                    {/* TTRK Section */}
                    <div className="border-b py-3">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Time to Register Kill (TTRK)
                      </h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        The time between the first frame of the animation and the moment the kill is registered. We use
                        the final frame right as the kill register sound is queued.
                      </p>
                      <p className="mt-0.5 text-xl font-semibold tracking-tight text-black dark:text-pink-300">
                        {item.ttrk} ± {uncertainty}s
                      </p>
                    </div>

                    {/* TTCA Section */}
                    <div className="border-b py-3">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Time to Complete Animation (TTCA)
                      </h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        The time between the first frame of the animation and the final frame, also known has the moment
                        when the player regains control.
                      </p>
                      <p className="mt-0.5 text-xl font-semibold tracking-tight text-black dark:text-pink-300">
                        {item.ttca.toString() === "?" ? "Unknown" : item.ttca}
                      </p>
                    </div>

                    {/* SC Section */}
                    <div className="border-b py-3">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Slippery Coefficient
                      </h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        A classification of the motion of the character during the animation from A (best) to E (worst).{" "}
                        <span className="font-bold underline">
                          Finishing moves with high motion are less likely to be interrputed
                        </span>
                        .
                      </p>
                      <p className="mt-0.5 text-xl font-semibold tracking-tight text-black dark:text-pink-300">
                        Class {slipperyText}
                      </p>
                    </div>

                    {/* LDC Section */}
                    <div className="border-b py-3">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Ledge Danger Coefficient
                      </h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        If the radius is low, the finishing move is more confined to a small area and there is low risk
                        of being interrupted by a ledge.{" "}
                        <span className="font-bold underline">
                          Finishing moves with small radius are less likely to be interrputed
                        </span>
                        . This can negate the effect of the slippery coefficient.
                      </p>
                      <p className="mt-0.5 text-xl font-semibold tracking-tight text-black dark:text-pink-300">
                        Class {ledgeDangerText}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">Score</h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        A function that determines score based on the TTRK, Slippery Coeffiecient (1-5) and Ledge Danger
                        Coefficient (1-5)
                        <code className="mt-1.5 block tracking-tighter text-pink-500">
                          score = 100-(slippery^2-1)-(ledgeDanger^2-1)-(4*ttrk^2)
                        </code>
                      </p>
                      <p className="mt-0.5 text-xl font-semibold tracking-tight text-black dark:text-pink-300">
                        {item.score}
                      </p>
                    </div>
                  </div>

                  {/*  Bottom */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center border border-transparent bg-pink-100 px-4 py-2 text-sm font-medium text-pink-900 transition hover:bg-pink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                      onClick={exitFocus}
                    >
                      <span>Roger that</span>
                      <CheckCircleIcon className="ml-1 h-5 w-5" />
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
