import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { CatalogueGrid, CatalogueTable, LoadingCatalogue } from '.'

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function Catalogue({ hook }: Props) {
  const [viewType] = hook
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
    viewType ? (
      <CatalogueGrid catalogue={catalogue} />
    ) : (
      <CatalogueTable headers={headers} catalogue={catalogue} />
    )
  ) : (
    <LoadingCatalogue />
  )
}
