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
      defaultValue={video.quantity}
      className={classNames("admin text-xs", className ? className : "max-w-[5rem]")}
      onChange={(e) => {
        setVideoSaved(false)
        setVideo({ ...video, quantity: parseInt(e.target.value) })
      }}
    />
  )
}
