import React, { Dispatch, SetStateAction } from "react"
import { VideoMongoDBWithUrl } from "../../@types"
import classNames from "classnames"

export function PickQuantity({
  videoHook,
  setVideoSaved,
  className,
}: {
  setVideoSaved: Dispatch<SetStateAction<boolean>>
  videoHook: [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl | null>>]
  className?: string
}) {
  const [video, setVideo] = videoHook

  return (
    <input
      type="number"
      value={video.quantity}
      className={classNames(
        "text-xs",
        className ? className : "admin max-w-[5rem]",
        video.quantity < 0 && "bg-red-200",
      )}
      onChange={(e) => {
        setVideoSaved(false)
        setVideo({ ...video, quantity: parseInt(e.target.value) })
      }}
    />
  )
}
