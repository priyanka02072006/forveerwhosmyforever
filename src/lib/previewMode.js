// Creator preview is opt-in only. A normal visitor (Veer, on the real date)
// never sees any of this — there is no UI affordance pointing at it.
//
// To enter preview mode, the creator visits:
//   /?preview=forveer39
// That query param is stashed in sessionStorage so it survives navigation
// within the tab, but it is NEVER written anywhere that a public deploy
// would expose (no default-on flag, no build-time env toggle).
const PREVIEW_KEY = 'forveer_preview_session'
const PREVIEW_PASSPHRASE = 'forveer39'

export function checkAndStorePreviewFromUrl() {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  if (params.get('preview') === PREVIEW_PASSPHRASE) {
    sessionStorage.setItem(PREVIEW_KEY, '1')
    return true
  }
  return sessionStorage.getItem(PREVIEW_KEY) === '1'
}

export function isPreviewSession() {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(PREVIEW_KEY) === '1'
}

export function exitPreviewSession() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(PREVIEW_KEY)
}
