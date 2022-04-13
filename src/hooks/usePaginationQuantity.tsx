import { useEffect, useState } from 'react'

const usePaginationQuantity = () => {
  const [paginationQuantity, setPaginationQuantity] = useState(6)

  return [paginationQuantity, setPaginationQuantity]
}

export default usePaginationQuantity
