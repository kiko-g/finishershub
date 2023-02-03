import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import useAccessDenied from '../hooks/useAccessDenied'
import AccessModal from '../components/layout/AccessModal'
import { FullAccessBadge, LimitedAccessBadge } from '../components/utils'
import { LockClosedIcon } from '@heroicons/react/24/outline'

export default function AdminPage() {
  const [accessDenied, setAccessDenied] = useAccessDenied() // control access to content

  return (
    <Layout location="Admin">
      <Seo title="Admin" />
      <main className="flex flex-col gap-y-3 px-0 lg:px-4">
        <div className="mt-1 flex flex-col justify-between gap-y-2 lg:mt-3 lg:flex-row lg:gap-x-6">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Finishers Management</h2>
            <p className="grow text-lg font-normal">
              For members and members only. Let's build something great, shall we?
            </p>
          </div>
          <div className="mt-1 flex flex-col items-center justify-end gap-2 lg:mt-0 lg:flex-col">
            {accessDenied ? <LimitedAccessBadge /> : <FullAccessBadge />}
            <div className="flex w-full items-center justify-end gap-x-2">
              {accessDenied ? <AccessModal special lockedHook={[accessDenied, setAccessDenied]} /> : null}
            </div>
          </div>
        </div>

        <section className="relative min-h-[24rem] lg:min-h-[36rem]">
          {accessDenied ? (
            <DummyLockedContent />
          ) : (
            <div>
              <div></div>
            </div>
          )}
        </section>
      </main>
    </Layout>
  )
}

function DummyLockedContent() {
  return (
    <div
      className="absolute inset-0 flex h-full w-full items-center justify-center
      rounded border-2 border-gray-400/60 bg-gray-300/60 px-8 
      py-8 dark:border-black/50 dark:bg-black/25"
    >
      <div
        className="flex items-center justify-center gap-x-2 rounded border-2 border-slate-900/75 bg-slate-900/70 px-3 py-2 text-white 
        dark:border-white/50 dark:bg-white/20"
      >
        <LockClosedIcon className="h-12 w-10" />
        <span className="uppercase tracking-tight">If you're a member, sign in and get on the grind.</span>
      </div>
    </div>
  )
}
