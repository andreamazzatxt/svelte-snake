<script lang="ts">
	import { SquareVariants } from '$lib/components/Square/types';
	import src from '$lib/images/food/cherries.svg';

	export let variant: SquareVariants;
</script>

<div class={variant}>
	{#if variant === SquareVariants.food}
		<img {src} alt="Red cherries" />
	{/if}
</div>

<style>
	div {
		height: 2rem;
		width: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	img {
		height: 1.6rem;
		width: 1.6rem;
	}

	.empty,
	.food {
		background-color: black;
	}

	.snake {
		background-color: greenyellow;
	}

	.eating {
		background-color: greenyellow;
		transform: scale(1);
		animation: pulse 250ms infinite;
	}

	@keyframes pulse {
		0% {
			background-color: greenyellow;
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
		}

		70% {
			background-color: red;
			transform: scale(1);
			box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
		}

		100% {
			background-color: greenyellow;
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		}
	}
</style>
