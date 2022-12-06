const resetCookies = () => {
  document.cookie
    .split(';')
    .forEach(
      cookie =>
        (document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
    )
}

const clearCache = (invalidateCookies?: boolean) => {
  localStorage.clear()
  sessionStorage.clear()
  if (invalidateCookies) resetCookies()
}

const isStorageValid = (hoursElapsed: number = 24 * 7) => {
  const storedVideos = JSON.parse(localStorage.getItem('finishershub.videos'))
  const storedSavedTime = new Date(JSON.parse(localStorage.getItem('finishershub.videos-fetch-date'))).getTime()
  const expiredStorage = Math.abs(new Date().getTime() - storedSavedTime) / 36e5 > hoursElapsed

  return storedVideos !== null && storedSavedTime !== null && !expiredStorage
}

const writeVideosStorage = (videos: string[]) => {
  localStorage.setItem('finishershub.videos', JSON.stringify(videos))
  localStorage.setItem('finishershub.videos-fetch-date', JSON.stringify(new Date()))
}

export { clearCache, isStorageValid, writeVideosStorage }
