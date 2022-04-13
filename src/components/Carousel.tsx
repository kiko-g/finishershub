import React from 'react'

type CarouselProps = {
  video: string
}

export const Carousel = ({ video }: CarouselProps) => {
  const prev = () => {
    console.log('Previous pressed')
  }

  const next = () => {
    console.log('Next pressed')
  }

  return (
    <div className="h-full w-full rounded-xl shadow">
      <div className="relative h-full w-full">
        <video controls className="h-full w-full rounded-xl" src={video} />

        <button
          className="group absolute top-1/2 left-2 z-10 rounded-full bg-white/10 p-0.5 transition hover:bg-white/50"
          onClick={prev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white transition group-hover:text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="group absolute top-1/2 right-2 z-10 rounded-full bg-white/10 p-0.5 transition hover:bg-white/50"
          onClick={next}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white transition group-hover:text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
