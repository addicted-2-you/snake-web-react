import { clamp, getRandomIntervalInt } from '../../shared/utils/nums';
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

  while (result.length < length) {
    const tail = result[result.length - 1];
    result.push({
      x: tail.x,
      y: clamp(tail.y - 1, 0, height),
      type: 'snakeTail',
    });
  }

  return result;
};
