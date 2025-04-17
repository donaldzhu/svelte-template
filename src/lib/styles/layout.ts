import { MAIN_PADDING_REM, MENU_MAX_WIDTH_REM, MENU_WIDTH_VW } from './constants'
import { getRem, vh, vw } from '$lib/utils/styles'


export const getLayoutWidths = () => {
  const maxMenuWidth = getRem(MENU_MAX_WIDTH_REM)
  const menuWidth = Math.min(vw(MENU_WIDTH_VW), maxMenuWidth) + getRem(MAIN_PADDING_REM)
  const mainWidth = vw() - menuWidth - getRem(MAIN_PADDING_REM) * 2 - 4 // TODO: border width
  const mainHeight = vh() - getRem(MAIN_PADDING_REM) * 2 - 4
  return { menuWidth, mainWidth, mainHeight }
}
