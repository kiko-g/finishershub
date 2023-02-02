import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

type Props = {
  api: any
  paginationQuantity: number | React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ api, paginationQuantity }: Props) => {
  const [activePage, setActivePage] = useState(1)
  const pages = Array(paginationQuantity).fill(null)

  const prev = () => {}
  const next = () => {}

  return (
    <div className="flex items-center justify-between py-3">
      {/* Mobile Pagination */}
      <nav className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={prev}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </nav>

      {/* Desktop Pagination */}
      <nav className="relative z-0 hidden -space-x-px rounded-md sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <button
          onClick={() => prev()}
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {pages.map((page, pageIdx) => (
          <button
            aria-current="page"
            key={`page-button-${pageIdx + 1}`}
            onClick={() => setActivePage(pageIdx + 1)}
            className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
              activePage === pageIdx + 1
                ? 'z-10 border-primary/80 bg-indigo-50 text-primary'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            {pageIdx + 1}
          </button>
        ))}

        <button
          onClick={() => next()}
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  )
}

export default Pagination
