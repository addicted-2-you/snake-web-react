export type TGameSnakeCellType = 'snakeHead' | 'snakeTail';
export type TGameCellType = 'bg' | 'apple' | TGameSnakeCellType;

type TCellBase<T extends TGameCellType> = {
  type: T;
  id: string;
  x: number;
  y: number;
};

export type TGameSnakeCell = TCellBase<TGameSnakeCellType>;
export type TGameAppleCell = TCellBase<'apple'>;
export type TGameBgCell = TCellBase<'bg'>;

export type TGameCell = TGameSnakeCell | TGameAppleCell | TGameBgCell;

export type TGameCellCoords = Pick<TGameCell, 'x' | 'y'>;
