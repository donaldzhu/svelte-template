<script lang="ts">
  import { draggable } from '@neodrag/svelte'
  import { getContext, onMount } from 'svelte'
  import { getLayoutWidths } from '$lib/styles/layout.js'
  import { quickArray } from '$lib/utils/general'
  import type { Point } from '$lib/types/util'
  import type { DragData } from '../types'

  const { dragData, setDragData, setZIndices }: DragData =
    getContext('drag-positions')
  const { data } = $props()
  const { items } = data.drag

  let isLoaded = $state(false)

  const memoizePosition = (index: number, x: number, y: number) => {
    setDragData(
      {
        x: x / getLayoutWidths().mainWidth,
        y: y / getLayoutWidths().mainHeight,
      },
      index,
      index === items.length - 1,
    )
  }

  const getInitialPosition = (index: number) => {
    const { mainWidth, mainHeight } = getLayoutWidths()
    const x = Math.random() * 0.8 * mainWidth
    const y = Math.random() * 0.8 * mainHeight
    memoizePosition(index, x, y)
    return { x, y }
  }

  const scalePositions = (positions: Point[]) => {
    const { mainWidth, mainHeight } = getLayoutWidths()
    return positions.map(position => ({
      x: position.x * mainWidth,
      y: position.y * mainHeight,
    }))
  }

  let initialPositions = $state(
    $dragData.hasShuffled
      ? scalePositions($dragData.positions)
      : quickArray(items.length, () => ({ x: 0, y: 0 })),
  )

  onMount(() => {
    if (!isLoaded) isLoaded = true
    if (!$dragData.hasShuffled)
      initialPositions = quickArray(items.length, getInitialPosition)
  })

  const bumpZIndex = (index: number) =>
    setZIndices([
      ...$dragData.zIndices.filter(zIndex => zIndex !== index),
      index,
    ])
</script>

<div class="draggable__container">
  {#if isLoaded}
    {#each items as item, index}
      <div
        style:z-index={$dragData.zIndices.indexOf(index)}
        class="draggable__item"
        use:draggable={{
          position: initialPositions[index],
          onDragStart: () => bumpZIndex(index),
          onDragEnd: data => memoizePosition(index, data.offsetX, data.offsetY),
        }}
      >
        {item}
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  @use '$lib/styles/_entry' as *;
  .draggable__container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .draggable__item {
    width: fit-content;
    font-size: 1.5rem;
    background-color: white;
    user-select: none;
    position: absolute;
    @include grab-cursor;
    @include gray-border;
    border-color: black;
    padding: 1rem;
  }
</style>
