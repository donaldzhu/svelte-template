import { getRem, vw } from '$lib/utils/styles'

import { MAIN_PADDING_REM, MENU_MAX_WIDTH_REM, MENU_WIDTH_VW } from './constants'

export const getMenuWidth = () => {
  const maxWidth = getRem(MENU_MAX_WIDTH_REM)
  return Math.min(vw(MENU_WIDTH_VW), maxWidth) + getRem(MAIN_PADDING_REM)
}
