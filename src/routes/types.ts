import type { Point } from '$lib/types/util'
import type { Writable } from 'svelte/store'

export interface DragData {
  dragData: Writable<{
    positions: Point[]
    zIndices: number[]
    hasShuffled: boolean
  }>
  setDragData: (
    newPosition: Point,
    index: number,
    hasShuffled: boolean,
  ) => void
  setZIndices: (newZIndices: number[]) => void
}
