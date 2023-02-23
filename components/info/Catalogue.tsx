import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import LoadingCatalogue from './LoadingCatalogue'

type Props = {}

export default function Catalogue({}: Props) {
  const [headers, setHeaders] = useState<string[]>([])
  const [catalogue, setCatalogue] = useState<(string | number)[][]>([])
  const ready = useMemo(() => headers.length > 0 && catalogue.length > 0, [headers, catalogue])

  useEffect(() => {
    fetch('/api/mw2/catalogue').then((res) => {
      res.json().then((data) => {
        setHeaders(data.table.headers)
        setCatalogue(data.table.rows)
      })
    })
  }, [])

  return ready ? (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-md border border-slate-800 dark:border-white">
            <div
              className="mx-auto grid w-full grid-cols-7 divide-x divide-slate-800 rounded-t
              border-b border-slate-700/75 bg-slate-700/75 dark:divide-white 
              dark:border-white dark:bg-secondary/50"
            >
              {headers.map((header, headerIdx) => (
                <span
                  key={`header-${headerIdx}`}
                  className={classNames(
                    `whitespace-nowrap px-2 py-2 font-headings text-sm font-medium uppercase 
                    tracking-tighter text-white`,
                    headerIdx === 0 ? 'text-left' : 'text-center'
                  )}
                >
                  {header}
                </span>
              ))}
            </div>

            <div>
              {catalogue.map((row: (string | number)[], rowIdx: number) => (
                <div
                  key={`row-${rowIdx}`}
                  className={classNames(
                    `grid w-full grid-cols-7 divide-x divide-slate-800 border-b
                    border-slate-800 dark:divide-white dark:border-gray-100`,
                    rowIdx % 2 === 0
                      ? 'bg-white dark:bg-secondary/5'
                      : 'bg-primary/10 dark:bg-secondary/25',
                    rowIdx === catalogue.length - 1 ? 'rounded-b' : ''
                  )}
                >
                  {row.map((cell: string | number, cellIdx: number) => {
                    const isNumber = isNaN(Number(cell)) === false && cellIdx !== 2
                    return (
                      <span
                        key={`value-${cellIdx}`}
                        className={classNames(
                          `whitespace-nowrap px-2 py-1.5 text-xs`,
                          cellIdx === 0 ? 'text-left font-medium' : 'text-center font-normal',
                          cell.toString().includes('Bundle') ? 'bg-purple-500/80 text-white' : '',
                          cell.toString().includes('Battle Pass')
                            ? 'bg-cyan-500/80 text-white'
                            : '',
                          cell === 'No' ? 'bg-rose-600 text-white' : '',
                          cell === 'Yes' ? 'bg-teal-600 text-white' : '',
                          cell === 'Almost' ? 'bg-orange-400 text-white' : '',
                          cell === 'Ultra' ? 'bg-blue-500 text-white' : '',
                          isNumber
                            ? Number(cell) < 2.5
                              ? 'bg-teal-600 text-white'
                              : Number(cell) < 3
                              ? 'bg-amber-500 text-white'
                              : 'bg-rose-500 text-white'
                            : ''
                        )}
                      >
                        {cell}
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingCatalogue />
  )
}
