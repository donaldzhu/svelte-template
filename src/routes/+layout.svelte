<script lang="ts">
	import Menu from '../lib/components/menu/Menu.svelte'
	import '../app.css'
	let { children } = $props()
</script>

<div class="app">
	<Menu />
	<main>
		{@render children()}
	</main>
</div>

<style lang='scss'>
	.app {
		display: flex;
		flex-direction: row;
		min-height: 100vh;
	}

	main {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		margin: 0 auto;
	}
</style>
