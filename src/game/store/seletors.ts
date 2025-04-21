import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { getCellGridCss } from '../util/game';

export const selectGameWidth = (state: RootState) => state.game.width;

export const selectGameHeight = (state: RootState) => state.game.height;

export const selectLastDirection = (state: RootState) =>
  state.game.lastDirection;

export const selectSnake = (state: RootState) => state.game.snake;

export const selectSnakeWithStyles = createSelector([selectSnake], (snake) =>
  snake.map((s) => ({
    ...s,
    style: getCellGridCss(s),
  })),
);

export const selectApples = (state: RootState) => state.game.apples;

export const selectApplesWithStyles = createSelector([selectApples], (apples) =>
  apples.map((a) => ({
    ...a,
    style: getCellGridCss(a),
  })),
);
