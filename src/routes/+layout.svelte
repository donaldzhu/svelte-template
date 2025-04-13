<script lang="ts">
  import Menu from '../lib/components/menu/Menu.svelte'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import '../app.css'
  import { quickArray } from '$lib/utils/general'
  import type { DragData } from './types'
  import type { Point } from '$lib/types/util'
  let { data, children } = $props()

  let dragData = writable({
    positions: quickArray(data.drag.items.length, () => ({ x: 0, y: 0 })),
    zIndices: quickArray(data.drag.items.length),
    hasShuffled: false,
  })

  const setDragData = (
    newPosition: Point,
    index: number,
    hasShuffled: boolean,
  ) => {
    $dragData.positions[index] = newPosition
    if (hasShuffled) $dragData.hasShuffled = hasShuffled
  }

  const setZIndices = (newZIndices: number[]) =>
    ($dragData.zIndices = newZIndices)

  setContext<DragData>('drag-positions', { dragData, setDragData, setZIndices })
</script>

<div>
  <Menu />
  <main>
    {@render children()}
  </main>
</div>

<style lang="scss">
  @use '$lib/styles/_entry' as *;
  div {
    display: flex;
    flex-direction: row;
    max-height: 100vh;
  }

  main {
    @include gray-border;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    width: 100%;
    height: calc(100vh - 2rem);
    box-sizing: border-box;
    overflow: hidden;
  }
</style>
