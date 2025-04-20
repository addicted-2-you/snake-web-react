export type TGameSnakeCellType = 'snakeHead' | 'snakeTail';

export type TGameCellType = 'bg' | 'apple' | TGameSnakeCellType;

export type TGameCellCoords = {
  x: number;
  y: number;
};

export type TGameCell = {
  type: TGameCellType;
  x: number;
  y: number;
};

export type TGameSnakeCell = {
  type: TGameSnakeCellType;
  x: number;
  y: number;
};

export type TGameAppleCell = {
  type: 'apple';
  x: number;
  y: number;
};
