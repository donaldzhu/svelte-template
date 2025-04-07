<script lang="ts">
  import { MAIN_PADDING_REM } from '$lib/styles/constants'
  import { getMenuWidth } from '$lib/styles/layout'
  import { getRem, vh, vw } from '$lib/utils/styles'
  import type { Sketch } from 'p5-svelte'
  import P5 from 'p5-svelte'
  import { onMount } from 'svelte'
  import Slider from './Slider.svelte'

  let width = $state(100)
  let height = $state(100)
  let isLoaded = $state(false)
  let hasResized = $state(false)

  const SKECTCHES_TEMP = ['1', '2', '3', '4']
  let sketchIndex = $state(0)

  const SETTINGS_TEMP = ['1', '2', '3', '4']

  const getCanvasSize = () => {
    const canvasWidth = vw() - getMenuWidth() - getRem(MAIN_PADDING_REM) * 2 - 4 // TODO: border width
    const canvasHeight = vh() - getRem(MAIN_PADDING_REM) * 2 - 4
    return { width: canvasWidth, height: canvasHeight }
  }

  onMount(() => (isLoaded = true))

  const sketch: Sketch = p5 => {
    p5.setup = () => {
      p5.createCanvas(100, 100)
    }

    p5.draw = () => {
      if (!isLoaded) return
      if (!hasResized) {
        const { width, height } = getCanvasSize()
        p5.resizeCanvas(width, height)
        hasResized = true
      }
      p5.ellipse(p5.width / 2, p5.height / 2, width, height)
    }

    p5.windowResized = () => {
      if (!isLoaded) return
      const { width, height } = getCanvasSize()
      p5.resizeCanvas(width, height)
    }
  }

  let value = $state(0)
</script>

<div class="p5-container">
  <div class="p5-controls">
    <h3>p5 CONTROLS</h3>
    <div class="p5-sketch-select">
      <h4>Sketch</h4>
      <div class="p5-sketch-select-buttons">
        {#each SKECTCHES_TEMP as setting, index}
          <button
            class={{ selected: sketchIndex === index }}
            onclick={() => (sketchIndex = index)}
          >
            {setting}
          </button>
        {/each}
      </div>
    </div>
    <div class="p5-sketch-settings-container">
      <h4>Settings</h4>
      <div class="p5-sketch-settings">
        {#each SETTINGS_TEMP as label}
          <Slider {label} />
        {/each}
      </div>
    </div>
  </div>
  <P5 {sketch} />
</div>

<style lang="scss">
  @use '$lib/styles/_entry' as *;
  @use 'sass:math';

  .p5-container {
    height: calc(100vh - #{$border-medium} * 2);
    @include gray-border;
    position: relative;
  }

  .p5-controls {
    width: 21rem;

    position: fixed;
    top: 2.5rem;
    right: 2.5rem;

    display: flex;
    flex-direction: column;

    @include gray-border($corner-radius-m);
    background-color: #fff;
    border-color: #000;

    font-size: 1.25rem;

    > div {
      border-top: 1px solid $gray-opaque;
      padding: 1rem;
    }
  }

  h3,
  h4 {
    margin: 0;
  }

  h3 {
    padding: 1rem;
  }

  h4 {
    text-transform: uppercase;
    font-weight: normal;
    padding-bottom: 0.5rem;
  }

  .p5-sketch-select-buttons {
    display: flex;
    gap: 0.375rem;
  }

  button {
    font-family: $font-family-mono;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.2rem 0.45rem 0.1rem;
    cursor: pointer;

    transition:
      background-color $timing-short ease-in-out,
      color $timing-short ease-in-out;

    &.selected {
      background-color: black;
      color: white;
    }
  }

  .p5-sketch-settings {
    display: flex;
    flex-direction: column;
  }

  label {
    @include remify(15);
  }
</style>
