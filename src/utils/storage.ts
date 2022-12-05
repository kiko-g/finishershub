const deleteAllCookies = () => {
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
  })
}

const isStorageValid = (hoursElapsed: number) => {
  const storedVideos = JSON.parse(localStorage.getItem('finishershub.videos'))
  const storedSavedTime = new Date(JSON.parse(localStorage.getItem('finishershub.videos-fetch-date'))).getTime()
  const expiredStorage = Math.abs(new Date().getTime() - storedSavedTime) / 36e5 > hoursElapsed

  return storedVideos !== null && storedSavedTime !== null && !expiredStorage
}

const writeVideosStorage = (videos: string[]) => {
  localStorage.setItem('finishershub.videos', JSON.stringify(videos))
  localStorage.setItem('finishershub.videos-fetch-date', JSON.stringify(new Date()))
}

export { deleteAllCookies, isStorageValid, writeVideosStorage }
