import { LockClosedIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function DummyLockedContent({}: Props) {
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
