export type TGameSnakeCellType = 'snakeHead' | 'snakeTail';
export type TGameCellType = 'bg' | TGameSnakeCellType;

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
