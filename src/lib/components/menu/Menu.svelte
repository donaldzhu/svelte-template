<script lang="ts">
	import MenuLink from './MenuLink.svelte'
	import menu from '$lib/data/menu.json'
</script>

<menu>
	<ul>
		{#each menu as item, index}
			<MenuLink {index}	{...item} />
		{/each}
	</ul>
</menu>

<style lang="scss">
	menu {
		width: 25vw;
		height: calc(100vh - 1rem);
		max-width: 36rem;
		margin: 0;
		padding: 1rem 0 1rem 1rem;

/* 		position: fixed;
		top: 0;
		left: 0; */

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
