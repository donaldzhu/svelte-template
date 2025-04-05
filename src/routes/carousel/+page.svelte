<script lang="ts">
  import ArrowLeft from '$lib/images/carousel/arrow-left.svelte'
  import ArrowRight from '$lib/images/carousel/arrow-right.svelte'
  import { urlFor } from '$lib/sanity/image'
  import { modulo } from '$lib/utils/general.js'
  import { Spring } from 'svelte/motion'

  const IMG_WIDTH = 600

  const { data } = $props()
  const index = new Spring(0)

  const getImg = (index: number) => {
    const imgIndex = modulo(Math.floor(index), data.carousel.length)
    return urlFor(data.carousel[imgIndex]).width(IMG_WIDTH).url()
  }

  const offset = $derived(modulo(index.current, 1))
  const currentImg = $derived(getImg(index.current))
  const nextImg = $derived(getImg(index.current + 1))
</script>

<svelte:head>
  <title>Carousel</title>
</svelte:head>

<div class="carousel" style="--img-width: {IMG_WIDTH}px">
  <button aria-label="Previous" onclick={() => index.target--}>
    <ArrowLeft />
  </button>
  <div class="carousel-viewport">
    <div
      class="carousel-container"
      style="transform: translate(-{100 * offset}%, 0)"
    >
      <img src={currentImg} alt="" aria-hidden="true" />
      <img src={nextImg} alt="" />
    </div>
  </div>
  <button aria-label="Next" onclick={() => index.target++}>
    <ArrowRight />
  </button>
</div>

<style lang="scss">
  .carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    gap: 100px;
  }

  .carousel-viewport {
    width: var(--img-width);
    margin: auto;
    overflow: hidden;
  }

  .carousel-container {
    display: flex;
  }

  img {
    width: 100%;
    height: auto;
    transition: transform 0.5s ease-in-out;
    object-fit: contain;
  }

  button {
    $padding-vertical: 22px;
    $padding-inside: 30px;
    $padding-outside: 28px;

    padding: $padding-vertical $padding-inside $padding-vertical
      $padding-outside;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;

    background: none;
    cursor: pointer;

    &:last-child {
      padding: $padding-vertical $padding-outside $padding-vertical
        $padding-inside;
    }
  }
</style>
