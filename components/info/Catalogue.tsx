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
          <div className="overflow-hidden rounded-md border border-slate-900 dark:border-white">
            <div
              className="mx-auto grid w-full grid-cols-7 divide-x divide-slate-900 rounded-t
              border-b border-slate-900 bg-slate-700/75 dark:divide-white 
              dark:border-white dark:bg-secondary/60"
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
                    `grid w-full grid-cols-7 divide-x divide-slate-900
                    border-slate-900 dark:divide-white dark:border-gray-100`,
                    rowIdx % 2 === 0
                      ? 'bg-white dark:bg-secondary/5'
                      : 'bg-primary/10 dark:bg-secondary/20',
                    rowIdx === catalogue.length - 1 ? 'rounded-b' : 'border-b'
                  )}
                >
                  {row.map((cell: string | number, cellIdx: number) => {
                    const first = cellIdx === 0
                    const available = first && row.filter((x) => x.toString() === 'Yes').length > 1
                    const isNumber = isNaN(Number(cell)) === false && cellIdx !== 2
                    const sourceBP = cell.toString().includes('Battle Pass')
                    const sourceBundle = cell.toString().includes('Bundle')
                    const no = cell === 'No'
                    const yes = cell === 'Yes'
                    const ultra = cell === 'Ultra'
                    const almost = cell === 'Almost'

                    return (
                      <span
                        key={`value-${cellIdx}`}
                        className={classNames(
                          `whitespace-nowrap px-2 py-1.5 text-xs`,
                          first ? 'text-left font-medium' : 'text-center font-normal',
                          available ? 'bg-teal-600/90 text-white' : '',
                          sourceBP ? 'bg-cyan-500/90 text-white' : '',
                          sourceBundle ? 'bg-violet-400/90 text-white' : '',
                          no ? 'bg-slate-700 text-white dark:bg-slate-600/90' : '',
                          yes ? 'bg-cyan-600 text-white dark:bg-cyan-500/90' : '',
                          almost ? 'bg-orange-400 text-white dark:bg-orange-400/80' : '',
                          ultra ? 'bg-violet-500 text-white' : '',
                          isNumber
                            ? Number(cell) < 2.3
                              ? 'bg-blue-500 text-white'
                              : Number(cell) < 2.7
                              ? 'bg-emerald-500 text-white'
                              : Number(cell) < 3.0
                              ? 'bg-amber-500 text-white'
                              : 'bg-rose-700 text-white'
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
