import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TGameAppleCell, TGameCellCoords, TGameSnakeCell } from '../model/game';
import { TArrowKey } from '../model/keys';
import { getNewHead } from '../util/game';
import { OPPOSITE_KEYS_MAP } from '../constants/keys';

interface IGameState {
  width: number;
  height: number;
  snake: TGameSnakeCell[];
  apples: TGameAppleCell[];
  lastDirection: TArrowKey;
}

const initialState: IGameState = {
  width: 16,
  height: 16,
  snake: [],
  apples: [],
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
    setDirection: (state, action: PayloadAction<TArrowKey>) => {
      if (OPPOSITE_KEYS_MAP[action.payload] !== state.lastDirection) {
        state.lastDirection = action.payload;
      }
    },
    addApple: (state, action: PayloadAction<TGameCellCoords>) => {
      state.apples[0] = { type: 'apple', ...action.payload };
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

        if (newX < 0) {
          newX = state.width - 1;
        }

        if (newY >= state.height) {
          newY = 0;
        }

        if (newY < 0) {
          newY = state.height - 1;
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
  setDirection,
  addSnakeTail,
  moveSnake,
  addApple,
} = gameSlice.actions;
