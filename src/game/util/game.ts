import { getRandomIntervalInt } from '../../shared/utils/nums';
import { TGameCellType, TGameSnakeCell } from '../model/game';

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
