<script lang="ts">
	import Counter from './Counter.svelte'
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Hello World
	</h1>
	<h2>
		This is Donald’s Svelte Learning Project
	</h2>

	<Counter />
</section>

<style lang='scss'>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	h1 {
		width: 100%;
		text-align: center;
		font-size: 10rem;
		text-transform: uppercase;
		margin: 0;
	}

	h2 {
		margin: 0;
		margin-bottom: 1rem;

		font-size: var(--font-size-medium);
	}
</style>
