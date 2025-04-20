import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TGameSnakeCell } from '../model/game';

interface GameState {
  width: number;
  height: number;
  snake: TGameSnakeCell[];
}

const initialState: GameState = {
  width: 16,
  height: 16,
  snake: [],
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
    addSnakeTail: (state, action: PayloadAction<TGameSnakeCell>) => {
      state.snake.push(action.payload);
    },
    moveSnake: (state) => {
      const newSnake = [...state.snake].map((c, i) => {
        let newX = state.snake[i - 1]?.x || c.x;
        let newY = state.snake[i - 1]?.y || c.y + 1;

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
export const { setWidth, setHeight, setSnake, addSnakeTail, moveSnake } =
  gameSlice.actions;
