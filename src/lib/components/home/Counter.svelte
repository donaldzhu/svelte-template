<script lang="ts">
  import { Spring } from 'svelte/motion'
  import { modulo } from '$lib/utils/general'

  const count = new Spring(0)
  const offset = $derived(modulo(count.current, 1))
  const adjustNumber = (increment: number) => (count.target += increment)
</script>

<div class="counter">
  <button
    aria-label="Decrease the counter by one"
    onclick={() => adjustNumber(-1)}
  >
    -
  </button>

  <div class="counter-viewport">
    <div
      style:transform="translate(0, {100 * offset}%)"
      class="counter-digits"
    >
      <span class="hidden" aria-hidden="true"
        >{Math.floor(count.current + 1)}</span
      >
      <span>{Math.floor(count.current)}</span>
    </div>
  </div>

  <button
    aria-label="Increase the counter by one"
    onclick={() => adjustNumber(1)}
  >
    +
  </button>
</div>

<style lang="scss">
  @use '$lib/styles/_entry' as *;
  .counter {
    @include gray-border;
    display: flex;
    margin: 1.5rem 0;
    padding: 0.5rem;

    button {
      width: 2em;
      padding: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 0;
      background-color: transparent;
      touch-action: manipulation;
      font-size: 2.5rem;

      cursor: pointer;

      &:hover {
        background-color: var(--color-bg-1);
      }
    }
  }

  .counter-viewport {
    width: 8em;
    height: 4em;
    overflow: hidden;
    text-align: center;
    position: relative;

    span {
      font-family: $font-family-mono;
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      font-weight: 400;

      font-size: 3.5rem;
      align-items: center;
      justify-content: center;
    }
  }

  .counter-digits {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .hidden {
    top: -100%;
    user-select: none;
  }
</style>
