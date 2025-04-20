import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TGameSnakeCell } from '../model/game';
import { TArrowKey } from '../model/keys';
import { getNewHead } from '../util/game';

interface IGameState {
  width: number;
  height: number;
  snake: TGameSnakeCell[];
  lastDirection: TArrowKey;
}

const initialState: IGameState = {
  width: 16,
  height: 16,
  snake: [],
  lastDirection: 'ArrowDown',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setSnake: (state, action: PayloadAction<TGameSnakeCell[]>) => {
      state.snake = action.payload;
    },
    setDiretion: (state, action: PayloadAction<TArrowKey>) => {
      state.lastDirection = action.payload;
    },
    addSnakeTail: (state, action: PayloadAction<TGameSnakeCell>) => {
      state.snake.push(action.payload);
    },
    moveSnake: (state) => {
      const newSnake = [...state.snake].map((c, i) => {
        let newX = 0;
        let newY = 0;

        if (i === 0) {
          const newHead = getNewHead(c, state.lastDirection);
          newX = newHead.x;
          newY = newHead.y;
        } else {
          newX = state.snake[i - 1].x;
          newY = state.snake[i - 1].y;
        }

        if (newX >= state.width) {
          newX = 0;
        }

        if (newY >= state.height) {
          newY = 0;
        }

        return {
          x: newX,
          y: newY,
          type: c.type,
        };
      });

      state.snake = newSnake;
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const {
  setWidth,
  setHeight,
  setSnake,
  setDiretion,
  addSnakeTail,
  moveSnake,
} = gameSlice.actions;
