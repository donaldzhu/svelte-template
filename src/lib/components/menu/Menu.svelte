<script lang="ts">
  import MenuLink from './MenuLink.svelte'
  import menu from '$lib/data/menu.json'
  import {
    MAIN_PADDING_REM,
    MENU_MAX_WIDTH_REM,
    MENU_WIDTH_VW,
  } from '$lib/styles/constants'
</script>

<menu
  style:--width-vw="{MENU_WIDTH_VW}vw"
  style:--max-width-rem="{MENU_MAX_WIDTH_REM}rem"
  style:--padding-rem="{MAIN_PADDING_REM}rem"
>
  <ul>
    {#each menu as item, index}
      <MenuLink {index} {...item} />
    {/each}
  </ul>
</menu>

<style lang="scss">
  menu {
    width: var(--width-vw);
    height: calc(100vh - 2rem);
    max-width: var(--max-width-rem);
    margin: 0;
    padding: var(--padding-rem) 0 var(--padding-rem) var(--padding-rem);
    flex-shrink: 0;

    overflow-y: scroll;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
