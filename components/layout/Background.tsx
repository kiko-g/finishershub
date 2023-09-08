import React from "react"

export function Background() {
  const blobs = Array(12).fill(0)

  return (
    <div className="background-wrapper">
      <div className="background-area">
        <ul className="background-circles">
          {blobs.map((_, blobIdx) => (
            <li key={`blob-${blobIdx}`} />
          ))}
        </ul>
      </div>
    </div>
  )
}
