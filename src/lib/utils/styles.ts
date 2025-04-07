import { MENU_MAX_WIDTH_REM } from '$lib/styles/constants'

export const vw = (vw = 100) => vw / 100 * window.innerWidth
export const vh = (vh = 100) => vh / 100 * window.innerHeight
export const getRem = (rem: number) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize)


