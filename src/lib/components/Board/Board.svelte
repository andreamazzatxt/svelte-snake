<script lang="ts">
	import type { Coordinates, CoordinatesList } from '$lib/components/Board/types';
	import Square from '$lib/components/Square/Square.svelte';
	import { SquareVariants } from '$lib/components/Square/types';

	export let rows: number;
	export let columns: number;
	export let snake: CoordinatesList;
	export let food: CoordinatesList;

	$: isSnake = (x: number, y: number) => snake.some((coord) => coord.x === x && coord.y === y);
	$: isFood = (x: number, y: number) => food.some((coord) => coord.x === x && coord.y === y);
	$: isEating = snake.some(({ x, y }) => isFood(x, y));
	$: getSquareVariant = (x: number, y: number) => {
		if (isSnake(x, y)) {
			return isEating ? SquareVariants.eating : SquareVariants.snake;
		}
		if (isFood(x, y)) {
			return SquareVariants.food;
		}
		return SquareVariants.empty;
	};
</script>

<div class="table">
	{#each Array(rows).fill('') as _, y}
		<div class="row">
			{#each Array(columns).fill('') as _, x}
				<Square variant={getSquareVariant(x, y)} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.table {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 0.2rem;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
	}
</style>
