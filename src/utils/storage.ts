const isStorageValid = (hoursElapsed: number) => {
  const storedVideos = JSON.parse(localStorage.getItem('finishershub.videos'))
  const storedSavedTime = new Date(JSON.parse(localStorage.getItem('finishershub.videos-fetch-date'))).getTime()
  const expiredStorage = Math.abs(new Date().getTime() - storedSavedTime) / 36e5 > hoursElapsed

  if (storedVideos === null || storedSavedTime === null || expiredStorage) return false
  else return true
}

const writeVideosStorage = (videos: string[]) => {
  localStorage.setItem('finishershub.videos', JSON.stringify(videos))
  localStorage.setItem('finishershub.videos-fetch-date', JSON.stringify(new Date()))
}

export { isStorageValid, writeVideosStorage }
