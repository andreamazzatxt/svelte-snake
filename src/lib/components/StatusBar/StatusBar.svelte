<script lang="ts">
	export let points: number | undefined;
	import src from '$lib/images/food/cherries.svg';
</script>

<div>
	<img {src} alt="Red cherries" />
	<p>{points ?? 0}</p>
</div>

<style>
	img {
		height: 1.5rem;
	}
	div {
		display: flex;
		height: 3rem;
		align-items: center;
		justify-content: start;
		gap: 1rem;
	}
</style>
