import { getRandomIntervalInt } from '../../shared/utils/nums';
import { TGameCellCoords, TGameCellType, TGameSnakeCell } from '../model/game';
import { TArrowKey } from '../model/keys';

export const getCellStyle = (type: TGameCellType) => {
  switch (type) {
    case 'bg': {
      return 'bg-black';
    }

    case 'snakeHead': {
      return 'bg-gray-400';
    }

    case 'snakeTail': {
      return 'bg-white';
    }

    case 'apple': {
      return 'bg-red-500';
    }

    default: {
      return '';
    }
  }
};

interface IBuildSnakeParams {
  width: number;
  height: number;
  length?: number;
}

export const buildSnake = ({
  width,
  height,
  length = 1,
}: IBuildSnakeParams): TGameSnakeCell[] => {
  const result: TGameSnakeCell[] = [];

  result.push({
    x: getRandomIntervalInt(0, width),
    y: getRandomIntervalInt(0, height),
    type: 'snakeHead',
  });

  const existingCells: { [key: string]: boolean } = {};

  while (result.length < length) {
    const tail = result[result.length - 1];
    existingCells[`${tail.x}-${tail.y}`] = true;
    const direction = Math.random() > 0.5 ? 1 : -1;
    const coord = Math.random() > 0.5 ? 'x' : 'y';

    let newX = tail.x;
    let newY = tail.y;

    if (coord === 'x') {
      newX = tail.x + direction;
      if (existingCells[`${newX}-${newY}`]) {
        newX = tail.x - direction;
      }
    } else {
      newY = tail.y + direction;
      if (existingCells[`${newX}-${newY}`]) {
        newY = tail.y - direction;
      }
    }

    result.push({
      x: newX,
      y: newY,
      type: 'snakeTail',
    });
  }

  return result;
};

export const getNewHead = (head: TGameSnakeCell, direction: TArrowKey) => {
  const newHead = { ...head };

  switch (direction) {
    case 'ArrowUp': {
      newHead.y -= 1;
      break;
    }

    case 'ArrowRight': {
      newHead.x += 1;
      break;
    }

    case 'ArrowDown': {
      newHead.y += 1;
      break;
    }

    case 'ArrowLeft': {
      newHead.x -= 1;
      break;
    }

    default: {
      //
    }
  }

  return newHead;
};

export const getNewTail = (tail: TGameSnakeCell, lastDirection: TArrowKey) => {
  const newTail = { ...tail };

  switch (lastDirection) {
    case 'ArrowUp': {
      newTail.y += 1;
      break;
    }

    case 'ArrowRight': {
      newTail.x -= 1;
      break;
    }

    case 'ArrowDown': {
      newTail.y -= 1;
      break;
    }

    case 'ArrowLeft': {
      newTail.x += 1;
      break;
    }

    default: {
      //
    }
  }

  return newTail;
};

export const getRandomCell = (
  width: number,
  height: number,
): TGameCellCoords => {
  return {
    x: getRandomIntervalInt(0, width),
    y: getRandomIntervalInt(0, height),
  };
};

export const areSameCells = (c1: TGameCellCoords, c2: TGameCellCoords) => {
  return c1.x === c2.x && c1.y === c2.y;
};

export const clampCell = (
  cell: TGameCellCoords,
  width: number,
  height: number,
) => {
  const newCell = { ...cell };

  if (newCell.x >= width) {
    newCell.x = 0;
  }

  if (newCell.x < 0) {
    newCell.x = width - 1;
  }

  if (newCell.y >= height) {
    newCell.y = 0;
  }

  if (newCell.y < 0) {
    newCell.y = height - 1;
  }

  return newCell;
};

export const getCellGridCss = (c: TGameCellCoords) => ({
  gridColumnStart: c.x + 1,
  gridColumnEnd: c.x + 1,
  gridRowStart: c.y + 1,
  gridRowEnd: c.y + 1,
});
