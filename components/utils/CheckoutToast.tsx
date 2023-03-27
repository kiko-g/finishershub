import React from 'react'
import Link from 'next/link'

type Props = {
  expirationSeconds: number
}

export default function CheckoutToast({ expirationSeconds }: Props) {
  return (
    <div
      className="absolute bottom-4 left-4 z-[90] mr-4 flex items-start justify-start gap-3 rounded 
      bg-white px-4 py-4 opacity-100 shadow dark:bg-red-700 md:max-w-sm"
    >
      <div className="bg-gradient h-10 w-10 rounded bg-gradient-to-br from-indigo-400 via-blue-400 to-teal-400" />
      <div className="flex flex-1 flex-col justify-center gap-2 text-sm font-light">
        <p className="-mt-0.5">
          Checkout out our new Twitter account with brand new clips and frequent updates!{' '}
          <Link href="https://twitter.com/finishershub" className="text-[#1da1f2]">
            Take me there
          </Link>
          !
        </p>
      </div>
    </div>
  )
}
