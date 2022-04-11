import React from 'react'

type Props = {}

export const Carousel = (props: Props) => {
  return (
    <div className="h-full w-full rounded-xl shadow">
      <div className="relative h-full w-full">
        <video
          controls
          autoPlay
          className="h-full w-full rounded-xl"
          src="https://production.assets.clips.twitchcdn.net/42933675437-offset-7816.mp4?sig=ebc34f0a5138380f5704d02d99a9e8979278e368&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2F42933675437-offset-7816.mp4%22%2C%22device_id%22%3A%22acipLQp3c8AYGAwgxpU0N3mVmjzdCaWe%22%2C%22expires%22%3A1649708403%2C%22user_id%22%3A%2240540258%22%2C%22version%22%3A2%7D"
        />

        <button className="group absolute top-1/2 left-2 z-10 rounded-full bg-white/10 p-0 transition hover:bg-white/50 md:p-2">
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

        <button className="group absolute top-1/2 right-2 z-10 rounded-full bg-white/10 p-0 transition hover:bg-white/50 md:p-2">
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
