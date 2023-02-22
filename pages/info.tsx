import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import classNames from 'classnames'

type Props = {}

export default function InfoPage({}: Props) {
  useEffect(() => {
    fetch('/api/mw2/catalogue').then((res) => {
      res.json().then((data) => {
        setHeaders(data.table.headers)
        setCatalogue(data.table.rows)
      })
    })
  }, [])

  const [headers, setHeaders] = useState<string[]>([])
  const [catalogue, setCatalogue] = useState<(string | number)[][]>([])

  return (
    <Layout location="Info">
      {headers.length > 0 ? (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-md border border-slate-700 dark:border-secondary">
                <div
                  className="mx-auto grid w-full grid-cols-7 divide-x divide-gray-200 
                  rounded-t border-b border-slate-700/75 
                bg-slate-700/75 dark:divide-secondary dark:border-secondary/50 dark:bg-secondary/50"
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
                        `grid w-full grid-cols-7 divide-x divide-gray-200 dark:divide-white/50`,
                        rowIdx % 2 === 0
                          ? 'bg-white dark:bg-secondary/5'
                          : 'bg-gray-100 dark:bg-secondary/20',
                        rowIdx === catalogue.length - 1 ? 'rounded-b' : ''
                      )}
                    >
                      {row.map((cell: string | number, cellIdx: number) => {
                        const isNumber = isNaN(Number(cell)) === false && cellIdx !== 2
                        return (
                          <span
                            key={`value-${cellIdx}`}
                            className={classNames(
                              `whitespace-nowrap px-2 py-1 text-xs`,
                              cellIdx === 0 ? 'text-left font-semibold' : 'text-center font-normal',
                              cell.toString().includes('Bundle')
                                ? 'bg-purple-500/80 text-white'
                                : '',
                              cell.toString().includes('Battle Pass')
                                ? 'bg-cyan-500/80 text-white'
                                : '',
                              cell === 'No' ? 'bg-rose-600/90 text-white' : '',
                              cell === 'Yes' ? 'bg-teal-700/90 text-white' : '',
                              cell === 'Almost' ? 'bg-orange-400/90 text-white' : '',
                              cell === 'Ultra' ? 'bg-blue-500/90 text-white' : '',
                              isNumber
                                ? Number(cell) < 2.5
                                  ? 'bg-teal-500 text-white'
                                  : Number(cell) < 3
                                  ? 'bg-amber-400 text-white'
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
        <></>
      )}
    </Layout>
  )
}
