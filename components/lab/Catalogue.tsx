import React, { useEffect, useMemo, useState } from "react"
import type { CatalogueItemStatus, CatalogueItem as CatalogueItemType } from "../../@types"
import { CatalogueItem } from "."
import { strIncludes } from "../../utils"

type Props = {}

export default function Catalogue({}: Props) {
  const [filteredName, setFilteredName] = useState("")
  const [headers, setHeaders] = useState<string[]>([])
  const [catalogue, setCatalogue] = useState<(string | number)[][]>([])
  const ready = useMemo(() => headers.length > 0 && catalogue.length > 0, [headers, catalogue])
  const catalogueFiltered = useMemo(
    () => catalogue.filter((item) => strIncludes(item[0] as string, filteredName)),
    [catalogue, filteredName],
  )

  useEffect(() => {
    fetch("/api/catalogue/mw2").then((res) => {
      res.json().then((data) => {
        setHeaders(data.table.headers)
        setCatalogue(data.table.rows)
      })
    })
  }, [])

  return ready ? (
    <div className="flex flex-col gap-y-4">
      <FilterByName hook={[filteredName, setFilteredName]} />
      <CatalogueGrid catalogue={catalogueFiltered} />
    </div>
  ) : (
    <Loading />
  )
}

function CatalogueGrid({ catalogue }: { catalogue: (string | number)[][] }) {
  const [chosen, setChosen] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {catalogue.map((row, index) => {
        const finisher: CatalogueItemType = {
          name: row[0] as string,
          source: row[1] as string,
          season: row[2] as number,
          unlocked: row[3] as CatalogueItemStatus,
          accurate: row[4] as CatalogueItemStatus,
          ttrk: row[5] as number,
          ttca: row[6] as number,
          slippery: row[7] as 1 | 2 | 3 | 4 | 5,
          ledgeDanger: row[8] as 1 | 2 | 3 | 4 | 5,
          score: row[9] as number,
          video: row[10] as string,
        }

        return <CatalogueItem key={`item-${index}`} item={finisher} chosen={chosen} setChosen={setChosen} />
      })}
    </div>
  )
}

function FilterByName({ hook }: { hook: [string, React.Dispatch<React.SetStateAction<string>>] }) {
  const [searchQuery, setSearchQuery] = hook

  return (
    <input
      type="search"
      id="searchProduct"
      name="searchProduct"
      placeholder="Search by finishing move name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )
}

function Loading() {
  return (
    <div className="flex h-64 items-center justify-center rounded border border-primary/50 bg-primary/10 dark:border-secondary/50 dark:bg-secondary/10">
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="-ml-1 mr-3 h-12 w-12 animate-spin text-primary dark:text-secondary"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
      3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}
