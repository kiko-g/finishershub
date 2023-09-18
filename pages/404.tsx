import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Layout } from "@/components/layout"
import { ArrowLongRightIcon } from "@heroicons/react/24/outline"

export default function NotFound() {
  const memes = [
    <Turtle key="turtle" />,
    <TheRock key="rock" />,
    <OhNo key="ohno" />,
    <Doeu key="doeu" />,
    <Saul key="saul" />,
    <Blush key="blush" />,
  ]

  return (
    <Layout location="Oops">
      <main className="mx-auto mb-8 mt-0 flex h-full min-h-screen flex-col items-center justify-center gap-y-4">
        <div className="max-w-4xl">
          <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">404: Not Found</h2>
              <p className="font-normal">Not much too see here...</p>
            </div>

            <div className="w-full self-stretch lg:w-auto lg:self-auto">
              <Link
                href="/"
                className="group flex h-full w-full items-center justify-center gap-x-2 rounded bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 px-6 py-4 text-white transition hover:opacity-80 lg:w-auto"
              >
                <span className="font-normal tracking-tight">Country roads, take me home!</span>
                <ArrowLongRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="mb-2 mt-2 flex w-full md:hidden">
            <Frankie />
          </div>

          <div className="mt-2 hidden w-full gap-3 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
            {memes.map((meme, memeIdx) => (
              <div key={`block-${memeIdx}`}>{meme}</div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}

function Blush() {
  const title = "You look cute and breedable."

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/blush.jpg"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}

function Doeu() {
  const title = "If you know you know."

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/doeu.png"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}

function Frankie({ square }: { square?: boolean }) {
  const title = "Coming to theaters soon..."

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/frankie.jpeg"
      className={`${square ? "aspect-square" : ""} h-full w-full rounded object-cover shadow lg:w-full`}
    />
  )
}

function OhNo() {
  const title = "Oh dear lord what have you stumbled upon..?"

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/oh-no.gif"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}

function TheRock() {
  const title = "The Rock is sus of you mate."

  return (
    <Image
      title={title}
      alt={title}
      width={2000}
      height={2000}
      src="/images/404/rock-sus.gif"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}

function Turtle() {
  const title = "Bro... That's not right."

  return (
    <Image
      key="turtle"
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/turtle.jpg"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}

function Saul() {
  const title = "Your honor I think we got off on the wrong foot."

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/saul.jpg"
      className="aspect-square h-full w-full rounded bg-black object-contain shadow lg:w-full"
    />
  )
}
