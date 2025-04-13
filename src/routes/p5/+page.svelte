<script lang="ts">
  import { getLayoutWidths } from '$lib/styles/layout'
  import type { Sketch } from 'p5-svelte'
  import P5 from 'p5-svelte'
  import { onMount } from 'svelte'
  import Slider from '$lib/components/p5/Slider.svelte'
  import _ from 'lodash'
  import Sketch1 from '$lib/components/p5/sketches/sketch1.svelte'
  import Sketch2 from '$lib/components/p5/sketches/sketch2.svelte'
  import Sketch3 from '$lib/components/p5/sketches/sketch3.svelte'
  import { slide } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import Button from '$lib/components/common/Button.svelte'
  import AccordionOpen from '$lib/images/svg/accordion-down.svelte'

  const { data } = $props()

  let menuIsOpen = $state(true)
  let isLoaded = $state(false)
  let hasResized = $state(false)
  const sketchInstances = [new Sketch1(), new Sketch2(), new Sketch3()]

  const getQuerySketchIndex = () =>
    _.clamp(data.sketchIndex, 0, sketchInstances.length - 1)

  let sketchIndex = $state(getQuerySketchIndex())

  $effect(() => {
    sketchIndex = getQuerySketchIndex()
  })

  $effect(() => {
    goto(`/p5?sketch=${sketchIndex + 1}`, {
      replaceState: true,
      keepFocus: true,
    })
  })

  const currentSketch = $derived(sketchInstances[sketchIndex])
  const currentSettings = $derived(currentSketch.settings)

  onMount(() => (isLoaded = true))

  const sketch: Sketch = p5 => {
    p5.setup = () => {
      p5.createCanvas(100, 100)
    }

    p5.draw = () => {
      if (!isLoaded) return
      if (!hasResized) {
        const { mainWidth, mainHeight } = getLayoutWidths()
        p5.resizeCanvas(mainWidth, mainHeight)
        hasResized = true
      }
      currentSketch.draw(p5)
    }

    p5.windowResized = () => {
      if (!isLoaded) return
      const { mainWidth, mainHeight } = getLayoutWidths()
      p5.resizeCanvas(mainWidth, mainHeight)
    }
  }

  $effect(() => currentSketch.clear())

  const resetSettings = () => {
    for (let i = 0; i < sketchInstances.length; i++) {
      const instance = sketchInstances[i]
      instance.reset()
    }
  }
</script>

<!-- TODO: js timing constant -->
<div class="p5-container">
  <div class="p5-controls">
    <div
      tabindex="0"
      role="button"
      class="p5-controls-header"
      onclick={() => (menuIsOpen = !menuIsOpen)}
    >
      <h3>p5 CONTROLS</h3>
      <button style:transform={menuIsOpen ? 'rotate(180deg)' : ''}>
        <AccordionOpen />
      </button>
    </div>
    {#key menuIsOpen}
      <div
        class={['p5-controls-content', { hidden: !menuIsOpen }]}
        transition:slide={{ duration: 500 }}
      >
        <div class="p5-sketch-select">
          <h4>Sketches</h4>
          <div class="p5-sketch-select-buttons">
            {#each sketchInstances as _, index}
              <Button
                selected={sketchIndex === index}
                onclick={() => (sketchIndex = index)}
              >
                {index + 1}
              </Button>
            {/each}
          </div>
        </div>
        <div class="p5-sketch-settings-container">
          <div class="p5-sketch-settings">
            {#each currentSettings as setting}
              <Slider
                bind:value={setting.value}
                {..._.omit(setting, 'value')}
              />
            {/each}
          </div>
        </div>
        <div>
          <Button onclick={() => currentSketch.clear()}>Clear Canvas</Button>
          <Button onclick={resetSettings}>Reset Settings</Button>
        </div>
      </div>
    {/key}
  </div>
  <P5 {sketch} />
</div>

<style lang="scss">
  @use '$lib/styles/_entry' as *;
  @use 'sass:math';

  .p5-container {
    height: calc(100vh - #{$border-medium} * 2);
    position: relative;
    overflow: hidden;
  }

  $header-padding: 1rem;
  $header-font-size: 1.4rem;
  $header-line-height: 1;
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

    .p5-controls-content > div {
      border-top: 1px solid $gray-opaque;
      padding: 1rem;
    }

    .p5-controls-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      button {
        transition: transform $timing-long ease-in-out;
      }
    }
  }

  h3,
  h4 {
    margin: 0;
  }

  h3 {
    font-size: 1.4rem;
    line-height: 1.2;
    cursor: default;
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

  .p5-sketch-settings {
    display: flex;
    flex-direction: column;
  }

  .hidden {
    display: none;
  }
</style>
