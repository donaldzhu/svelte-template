<script lang="ts">
  const { children, selected = false, onclick } = $props()
</script>

<button class={{ selected }} {onclick}>
  {@render children()}
</button>

<style lang="scss">
  @use '$lib/styles/_entry' as *;
  button {
    font-family: $font-family-mono;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.2rem 0.45rem 0.1rem;
    cursor: pointer;
    user-select: none;
    transition:
      background-color $timing-short ease-in-out,
      color $timing-short ease-in-out;

    &:hover,
    &.selected {
      background-color: black;
      color: white;
    }
  }
</style>
