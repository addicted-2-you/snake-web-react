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
  },
});

export const gameReducer = gameSlice.reducer;
export const { setWidth, setHeight, setSnake, addSnakeTail } =
  gameSlice.actions;
