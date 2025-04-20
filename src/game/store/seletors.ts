import { RootState } from '../../store';

export const selectGameWidth = (state: RootState) => state.game.width;

export const selectGameHeight = (state: RootState) => state.game.height;

export const selectLastDirection = (state: RootState) =>
  state.game.lastDirection;

export const selectSnake = (state: RootState) => state.game.snake;

export const selectApples = (state: RootState) => state.game.apples;
