<script lang="ts">
  import { page } from '$app/state'
  const { index, name, slug, description, tags } = $props()
  const href = `/${index === 0 ? '' : slug}`
  const isActive = $derived(page.url.pathname === href)
</script>

<li
  class={["menu-link", isActive && 'menu-link--active']}
  aria-current={page.url.pathname === href ? 'page' : undefined}>
  <a href={href}>
    <div class="menu-link-container">
      <p class="menu-link-index">{index + 1}</p>
      <div class="menu-link-content">
        <h4 class="menu-link-name">{name}</h4>
        <p class="menu-link-description">{description}</p>
        <ul class="menu-link-tags">
          {#each tags as tag}
            <li>
              {tag}
              <span class="menu-link-tag-separator">·</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </a>
</li>

<style lang="scss">
  @use '$lib/styles/_entry' as *;
  .menu-link {
    margin: 0;
		margin-bottom: 1rem;
    padding: 1rem 1rem 1.75rem;

    color: #fff;

    border-radius: 0.75rem;
    background-color: #000;

    transition: all 0.15s ease-in-out;

    &:hover {
      transform: rotateX(27.5deg);
    }

    &--active {
      background-color: #d0d0d0;

    }
	}

  a {
    user-select: none;
		&,
		&:active,
		&:visited {
			color: inherit;
      text-decoration: none;
		}
	}

  .menu-link-container {
    display: flex;
    flex-direction: row;
  }

  .menu-link-index {
    margin: 0.2em 0 0;
    width: 3.5rem;

    @include remify(40);
    font-weight: 600;
  }

  h4 {
    margin: 0;

    @include remify(75);
    line-height: 1.15em;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .menu-link-description {
    margin: 0.2em 0 0.7em;

    font-size: var(--font-size-medium);
    line-height: 0.9em;
  }

  .menu-link-tags {
    font-family: 'ABC ROM Mono', sans-serif;
    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    list-style: none;

    li {
      @include remify(13);

      &:last-child {
        .menu-link-tag-separator {
          display: none;
        }
      }
    }
  }
</style>