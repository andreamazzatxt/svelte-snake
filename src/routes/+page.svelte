<script lang="ts">
	import Board from '$lib/components/Board/Board.svelte';
	import type { CoordinatesList } from '$lib/components/Board/types';
	import Button from '$lib/components/Button/Button.svelte';
	import StatusBar from '$lib/components/StatusBar/StatusBar.svelte';
	import { Directions, GameStatus } from '$lib/types/game';
	import {
		keyToDirection,
		moveSnake,
		isGameOver,
		updateFood,
		generateNewSnake,
		getNewFood
	} from '$lib/utils/game';
	import { onDestroy } from 'svelte';

	let size = 20;

	let direction: Directions;
	let nextDirection: Directions;
	let snake: CoordinatesList = [];
	let food: CoordinatesList = [];
	let points: number;
	let frameSpeed = 500;
	let intervalId: NodeJS.Timer;
	let status: GameStatus = GameStatus.idle;

	const increaseSpeed = () => (frameSpeed *= 0.9);

	const increasePoints = () => points++;

	const handleController = ({ key }: KeyboardEvent) => {
		nextDirection = keyToDirection(key, direction) ?? direction;
	};

	const startGame = () => {
		snake = generateNewSnake(size);
		food = [getNewFood(snake, food, size)];
		frameSpeed = 500;
		status = GameStatus.running;
		direction = nextDirection = Directions.up;
		points = 0;
	};

	const gameLoop = () => {
		const [newFood, hasEaten] = updateFood(snake, food, size);
		food = newFood;
		snake = moveSnake(snake, nextDirection, hasEaten);
		direction = nextDirection;

		if (isGameOver(snake, size)) {
			clearInterval(intervalId);
			status = GameStatus.over;
		}

		if (hasEaten) {
			increaseSpeed();
			increasePoints();
		}
	};

	$: {
		clearInterval(intervalId);
		if (status === GameStatus.running) intervalId = setInterval(gameLoop, frameSpeed);
	}

	onDestroy(() => clearInterval(intervalId));
</script>

<section>
	<StatusBar {points} />
	<div>
		{#if status !== GameStatus.running}
			<div class="overlay">
				{#if status === GameStatus.over}
					<h4>Game over</h4>
				{/if}
				<Button onClick={startGame}>Start Game</Button>
			</div>
		{/if}
		<Board columns={size} rows={size} {snake} {food} />
	</div>
</section>

<svelte:window on:keydown|preventDefault={handleController} />

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	div {
		position: relative;
	}
	h4 {
		color: red;
	}

	.overlay {
		background-color: #13131380;
		height: 100%;
		width: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
	}
</style>
