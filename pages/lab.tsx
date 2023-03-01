import React from 'react'
import Layout from '../components/layout'
import { Catalogue, ViewTypeToggler } from '../components/lab'

type Props = {}

export default function LabPage({}: Props) {
  const [viewType, setViewType] = React.useState(true)

  return (
    <Layout location="Lab">
      <main className="mb-12 flex flex-col gap-6 px-0 lg:px-4">
        <header className="flex flex-col justify-center gap-2">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Finishers Lab</h2>
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
              <ViewTypeToggler hook={[viewType, setViewType]} />
            </div>
          </div>

          <Catalogue hook={[viewType, setViewType]} />
        </div>
      </main>
    </Layout>
  )
}
