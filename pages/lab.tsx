import React from 'react'
import { Layout } from '../components/layout'
import { Catalogue, ViewTypeToggler } from '../components/lab'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function Lab({}: Props) {
  const [viewType, setViewType] = React.useState(true)

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
              <h2 className="mb-1 text-2xl font-bold tracking-tight sm:text-3xl">
                MW2 Finishers Catalogue
              </h2>
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
