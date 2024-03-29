import React from "react"

export function ShuffleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 15" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.354 1.146a.5.5 0 0 0-.708.708L12.793 3H12c-1.296 0-2.289.584-3.128 1.39-.671.644-1.279 1.467-1.877 2.278-.132.179-.263.357-.395.532C5.109 9.188 3.49 11 .5 11a.5.5 0 0 0 0 1c3.51 0 5.391-2.188 6.9-4.2.144-.192.283-.38.42-.565.597-.808 1.14-1.544 1.745-2.124C10.289 4.416 11.046 4 12 4h.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2ZM.5 3c2.853 0 4.63 1.446 6.005 3.067l-.129.176a78.944 78.944 0 0 1-.484.65C4.573 5.293 3.026 4 .5 4a.5.5 0 0 1 0-1Zm8.372 7.61c-.5-.479-.963-1.057-1.414-1.655.189-.238.369-.474.542-.705l.09-.12c.494.664.963 1.268 1.475 1.76.724.694 1.481 1.11 2.435 1.11h.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L12.793 12H12c-1.296 0-2.289-.584-3.128-1.39Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
