import { VideoPage } from "../../components/videos"

type Props = {}

export default function VideoDefault({}: Props) {
  const defaultIndex = 0

  return <VideoPage videoIndex={defaultIndex} game="" />
}
