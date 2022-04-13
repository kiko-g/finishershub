import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import '../styles/components/pagination.css'

type PaginationProps = {
  api: any
}

export const Pagination = ({ api }: PaginationProps) => {
  const [activePage, setActivePage] = useState(1)
  const pages = Array(3).fill(null)

  const prev = () => {
    console.log('previous page')
  }

  const next = () => {
    console.log('next page')
  }

  return (
    <div className="pagination">
      {/* Mobile Pagination */}
      <nav className="mobile">
        <button onClick={() => prev()}>Previous</button>
        <button onClick={() => next()} className="ml-3">
          Next
        </button>
      </nav>

      {/* Desktop Pagination */}
      <nav className="desktop">
        <button onClick={() => prev()} className="previous">
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {pages.map((page, pageIdx) => (
          <button
            aria-current="page"
            key={`page-button-${pageIdx + 1}`}
            onClick={() => setActivePage(pageIdx + 1)}
            className={`page ${activePage === pageIdx + 1 ? 'active' : 'inactive'}`}
          >
            {pageIdx + 1}
          </button>
        ))}

        <button onClick={() => next()} className="next">
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  )
}
