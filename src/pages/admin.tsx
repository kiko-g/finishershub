import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import useAccessDenied from '../hooks/useAccessDenied'
import AccessModal from '../components/layout/AccessModal'
import { FullAccessBadge, LimitedAccessBadge } from '../components/utils'
import { DummyLockedContent } from '../components/admin'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export default function AdminPage() {
  const [accessDenied, setAccessDenied] = useAccessDenied() // control access to content

  const [clipTitle, setClipTitle] = React.useState('') // clip title
  const [pernoca, setPernoca] = React.useState(false) // whether the clip includes a pernoca
  const [shouldBeMuted, setShouldBeMuted] = React.useState(false) // whether the clip includes sensitive audio

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

        <section className="relative mt-4 min-h-[24rem] lg:mt-0 lg:min-h-[36rem]">
          {accessDenied ? (
            <DummyLockedContent />
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              {/* Upload video */}
              <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
                {/* Drag video area */}
                <div
                  className="flex w-full items-center justify-center self-stretch rounded border-2 
                  border-dashed border-gray-500 bg-slate-800/5 py-6 dark:border-white/50 dark:bg-white/5"
                >
                  <span className="font-normal text-gray-700 dark:text-gray-200">Drag your video highlight here.</span>
                </div>

                {/* Upload video button */}
                <div className="w-full lg:w-auto">
                  <input className="sr-only" type="file" accept="video/mp4" id="upload-video" />
                  <label
                    htmlFor="upload-video"
                    className="flex cursor-pointer items-center justify-center gap-x-3 rounded border-2 
                  border-blue-500/90 bg-blue-500/60 px-8 py-6 text-white transition 
                  hover:bg-blue-500/90 dark:bg-blue-500/40 dark:hover:bg-blue-500/80"
                  >
                    <ArrowUpTrayIcon className="h-7 w-7" />
                    <span className="whitespace-nowrap font-normal">Upload your highlight</span>
                  </label>
                </div>
              </div>

              {/* Form for uploaded video */}
              <div
                className="flex h-full w-full flex-col gap-4 rounded border-2 border-gray-500 bg-black/5
                px-4 py-4 dark:border-white/10 dark:bg-white/5 lg:flex-row"
              >
                {/* Desktop image */}
                <img
                  alt="Art"
                  src="https://images.unsplash.com/photo-1568158951683-b5dadda4cd8a"
                  className="hidden max-h-[32rem] rounded object-cover lg:flex"
                />
                {/* Mobile image */}
                <img
                  alt="Art"
                  src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054"
                  className="flex max-h-[32rem] rounded object-cover lg:hidden"
                />

                <form className="flex w-full flex-col items-center justify-between gap-4">
                  <div className="flex w-full flex-col gap-y-4">
                    <label htmlFor="clipTitle" className="w-full tracking-tight">
                      <span>Title of your clip</span>
                      <input
                        required
                        id="clipTitle"
                        type="text"
                        name="clipTitle"
                        className="mt-1 px-3 py-3"
                        placeholder="Que escândalo na verdoca!"
                        value={clipTitle}
                        onChange={e => setClipTitle(e.target.value)}
                      />
                    </label>

                    <div
                      className="flex flex-col items-start gap-y-2 rounded border-2 border-white 
                      bg-white/70 px-4 py-4 dark:border-white/20 dark:bg-white/5"
                    >
                      {/* Pernoca */}
                      <div className="flex w-full items-center justify-start gap-x-2 text-sm">
                        <input
                          type="checkbox"
                          id="muted-checkbox"
                          className="cursor-pointer"
                          checked={shouldBeMuted}
                          onChange={e => setShouldBeMuted(e.target.checked)}
                        />
                        <label className="block w-full cursor-pointer font-normal" htmlFor="muted-checkbox">
                          Pernoca
                        </label>
                      </div>

                      {/* Should be muted */}
                      <div className="flex w-full items-center justify-start gap-x-2 text-sm">
                        <input
                          type="checkbox"
                          id="pernoca-checkbox"
                          className="cursor-pointer"
                          checked={pernoca}
                          onChange={e => setPernoca(e.target.checked)}
                        />
                        <label className="block w-full cursor-pointer font-normal" htmlFor="pernoca-checkbox">
                          Should be muted
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded border-2 border-teal-600/90 bg-teal-600/60 px-4 py-2 
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
