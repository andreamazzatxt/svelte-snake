<script>
	import './styles.css';
</script>

<svelte:head>
	<title>Svelte Snake</title>
	<meta name="description" content="Svelte Snake" />
</svelte:head>

<div class="app">
	<main>
		<h1>Svelte Snake</h1>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		align-items: center;
	}
</style>
