<script>
  const { label } = $props()
  let value = $state(50)
  const min = 0
  const max = 100
  const range = max - min
</script>

<div
  class="range-slider"
  style:--min={min}
  style:--max={max}
  style:--value={value}
>
  <div class="range-slider__content">
    <label for="range-slider__{label}">
      Slider {label}
    </label>
    <div class="range-slider__container">
      <input
        id="range-slider__{label}"
        type="range"
        bind:value
        min="0"
        max="100"
      />
      <div class="range-slider__progress" aria-hidden="true"></div>
    </div>
  </div>
  <div class="range-slider__bounds">
    <span
      class={['range-slider__bound__min', { hidden: value / range <= 0.15 }]}
      >{min}</span
    >
    <span class="range-slider__bound__value">{value}</span>
    <span
      class={['range-slider__bound__max', { hidden: value / range >= 0.85 }]}
      >{max}</span
    >
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/_entry' as *;
  @use 'sass:math';

  $color: #000;
  $thumb-size: 1rem;
  $track-height: math.div($thumb-size, 2);
  $start-end: math.div($thumb-size, 2);

  $min: var(--min);
  $max: var(--max);
  $completion: calc((var(--value) - #{$min}) / (#{$max} - #{$min}));
  $slider-width: 77.5%;

  label {
    font-size: $font-size-extra-small;
  }

  .range-slider {
    width: 100%;
    margin-bottom: 1rem;
  }

  .range-slider__content {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  .range-slider__container {
    width: $slider-width;
    height: $thumb-size;

    position: absolute;
    left: 100% - $slider-width;
    flex-shrink: 0;

    display: flex;
    align-items: center;
  }

  .range-slider__progress {
    height: $track-height;
    position: absolute;
    left: $start-end;
    right: $start-end;

    background: $light-gray-opaque;
    border-radius: 999px;

    z-index: -1;
    pointer-events: none;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;

      background: $color;
      border-radius: inherit;

      clip-path: inset(0 calc(100% - #{$completion} * 100%) 0 0);
    }
  }

  input {
    appearance: none;
    width: 100%;
    margin: 0;
    position: absolute;
    left: 0;

    outline: none;
    background: none;

    cursor: grab;
    &:active {
      cursor: grabbing;
    }

    @mixin thumb {
      appearance: none;
      height: $thumb-size;
      width: $thumb-size;
      border-radius: 50%;
      background: $color;
      border: none;
      pointer-events: auto;
    }

    &::-webkit-slider-thumb {
      @include thumb;
    }
    &::-moz-range-thumb {
      @include thumb;
    }
    &::-ms-thumb {
      @include thumb;
    }
  }

  .range-slider__bounds {
    display: flex;
    justify-content: space-between;
    width: $slider-width;
    position: relative;
    left: 100% - $slider-width;
    font-size: $font-size-tiny;
    color: $light-gray-opaque;
    padding: 0 $start-end;
    box-sizing: border-box;
    font-family: $font-family-mono;

    span:first-child {
      transform: translateX(-50%);
    }

    span:last-child {
      transform: translateX(50%);
    }

    span {
      transition: opacity $timing-short ease-in-out;
      opacity: 1;
      &.hidden {
        opacity: 0;
      }
    }
  }

  .range-slider__bound__value {
    position: absolute;
    left: calc($completion * (100% - $start-end * 2) + $start-end);
    transform: translateX(-50%);
    color: $color;
    z-index: 1;
  }
</style>
