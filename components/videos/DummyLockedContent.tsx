import { LockClosedIcon } from "@heroicons/react/24/outline"

export function DummyLockedContent() {
  return (
    <div
      className="absolute inset-0 flex h-full min-h-[32rem] w-full items-center justify-center
      rounded border border-gray-400/60 bg-gray-300/60 px-8 
      py-8 dark:border-black/50 dark:bg-black/25"
    >
      <div
        className="flex items-center justify-center gap-x-2 rounded border border-gray-900/75 
        bg-gray-900/70 px-3 py-2 text-white dark:border-white/50 dark:bg-white/20"
      >
        <LockClosedIcon className="h-12 w-10" />
        <span className="uppercase tracking-tight">If you&apos;re a member, sign in and get on the grind.</span>
      </div>
    </div>
  )
}
