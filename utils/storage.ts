function resetCookies() {
  document.cookie
    .split(";")
    .forEach(
      (cookie) =>
        (document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)),
    )
}

function clearCache(invalidateCookies?: boolean) {
  localStorage.clear()
  sessionStorage.clear()
  if (invalidateCookies) resetCookies()
}

function isStorageValid(hoursElapsed: number = 24 * 7) {
  const videosStr = localStorage.getItem("finishershub.videos") as string
  const savedTimeStr = localStorage.getItem("finishershub.videos-fetch-date") as string

  const storedVideos = JSON.parse(videosStr)
  const storedSavedTime = new Date(JSON.parse(savedTimeStr)).getTime()
  const expiredStorage = Math.abs(new Date().getTime() - storedSavedTime) / 36e5 > hoursElapsed

  return storedVideos !== null && storedSavedTime !== null && !expiredStorage
}

function writeVideosStorage(videos: string[]) {
  localStorage.setItem("finishershub.videos", JSON.stringify(videos))
  localStorage.setItem("finishershub.videos-fetch-date", JSON.stringify(new Date()))
}

export { clearCache, isStorageValid, writeVideosStorage }
