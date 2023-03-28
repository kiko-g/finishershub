import React, { useEffect, useMemo, useState } from 'react'
import { CatalogueItemStatus, type CatalogueItem as CatalogueItemType } from '../../@types'
import CatalogueItem from './CatalogueItem'

type Props = {
  catalogue: (string | number)[][]
}

export default function CatalogueGrid({ catalogue }: Props) {
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
          motion: row[7] as 1 | 2 | 3 | 4 | 5,
          radius: row[8] as 1 | 2 | 3 | 4 | 5,
          score: row[9] as number,
        }

        return (
          <CatalogueItem
            key={`item-${index}`}
            item={finisher}
            chosen={chosen}
            setChosen={setChosen}
          />
        )
      })}
    </div>
  )
}
