import React from "react"

type Props = {
  hook: [string, React.Dispatch<React.SetStateAction<string>>]
}

export default function FilterByName({ hook }: Props) {
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
