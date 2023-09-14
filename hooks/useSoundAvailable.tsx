export function useSoundAvailable() {
  const soundOn = true

  const sensitive = process.env.NEXT_PUBLIC_SENSITIVE === "true" ? false : true
  const isProd = process.env.NODE_ENV === "production"
  const soundAvailable = !(sensitive && isProd) && soundOn

  return [soundAvailable]
}
