import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { CatalogueGrid, CatalogueTable, LoadingCatalogue, FilterByName } from '.'
import { strIncludes } from '../../utils'

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function Catalogue({ hook }: Props) {
  const [viewType] = hook
  const [filteredName, setFilteredName] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [catalogue, setCatalogue] = useState<(string | number)[][]>([])
  const ready = useMemo(() => headers.length > 0 && catalogue.length > 0, [headers, catalogue])
  const catalogueFiltered = useMemo(
    () => catalogue.filter((item) => strIncludes(item[0] as string, filteredName)),
    [catalogue, filteredName]
  )

  useEffect(() => {
    fetch('/api/mw2/catalogue').then((res) => {
      res.json().then((data) => {
        setHeaders(data.table.headers)
        setCatalogue(data.table.rows)
      })
    })
  }, [])

  return ready ? (
    <div className="flex flex-col gap-y-4">
      <FilterByName hook={[filteredName, setFilteredName]} />

      {viewType ? (
        <CatalogueGrid catalogue={catalogueFiltered} />
      ) : (
        <CatalogueTable headers={headers} catalogue={catalogueFiltered} />
      )}
    </div>
  ) : (
    <LoadingCatalogue />
  )
}
