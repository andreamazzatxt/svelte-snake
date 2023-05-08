import type { Coordinates, CoordinatesList } from "$lib/components/Board/types";
import { Directions } from "$lib/types/game"

export const getRandomPosition = (tableSize: number) => {
    const x = Math.floor(Math.random() * (tableSize - 1))
    const y = Math.floor(Math.random() * (tableSize - 1))
    return { x, y }
}

export const keyToDirection = (key: KeyboardEvent['key'], direction: Directions) => {
    switch (key) {
        case 'ArrowUp':
            return direction === Directions.down ? direction : Directions.up;
        case 'ArrowDown':
            return direction === Directions.up ? direction : Directions.down;
        case 'ArrowLeft':
            return direction === Directions.right ? direction : Directions.left;
        case 'ArrowRight':
            return direction === Directions.left ? direction : Directions.right;
    }
}

export const generateNewSnake = (size: number) => {
    const head = { x: Math.floor(size / 2), y: Math.floor(size / 2) }
    return [head, { x: head.x, y: head.y + 1 }]

}

export const moveSnake = (snake: CoordinatesList, direction: Directions, hasEaten: boolean) => {
    const { x, y } = snake[0]

    if (!hasEaten) {
        snake.pop()
    }

    switch (direction) {
        case Directions.up:
            return [{ x, y: y - 1 }, ...snake]
        case Directions.down:
            return [{ x, y: y + 1 }, ...snake]
        case Directions.left:
            return [{ x: x - 1, y }, ...snake]
        case Directions.right:
            return [{ x: x + 1, y }, ...snake]
    }
}

export const isGameOver = (snake: CoordinatesList, size: number) =>
    snake.some(({ x, y }, _, arr) =>
        /** Crush on snake body */
        arr.filter((coord) => coord.x === x && coord.y === y).length > 1
        /** Crush on borders */
        || x < 0
        || y < 0
        || x > size - 1
        || y > size - 1

    )

export const getNewFood = (snake: CoordinatesList, food: CoordinatesList, size: number): Coordinates => {
    const newFood = getRandomPosition(size)
    if (
        !snake.some(({ x, y }) => x === newFood.x && y === newFood.y
            || !food.some(({ x, y }) => x === newFood.x && y === newFood.y))
    ) {
        return getNewFood(snake, food, size)
    }
    return newFood
}

export const updateFood = (snake: CoordinatesList, food: CoordinatesList, size: number): [CoordinatesList, boolean] => {
    const filteredFood = food.filter(({ x, y }) => !(snake[0].x === x && snake[0].y === y))

    /** No food eaten */
    if (filteredFood.length === food.length) {
        return [food, false]
    }

    return [[getNewFood(snake, food, size), ...filteredFood], true]
}



