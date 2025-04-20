import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectGameHeight,
  selectGameWidth,
  selectSnake,
} from '../store/seletors';
import { TGameCell } from '../model/game';
import { GameCell } from './GameCell';
import { moveSnake, setDirection, setSnake } from '../store/reducer';
import { buildSnake } from '../util/game';
import { ARROW_KEYS } from '../constants/keys';
import { TArrowKey } from '../model/keys';

export const GameField = () => {
  const dispatch = useDispatch();

  const width = useSelector(selectGameWidth);
  const height = useSelector(selectGameHeight);
  const snake = useSelector(selectSnake);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code as string & TArrowKey;
      if (ARROW_KEYS.includes(code)) {
        dispatch(setDirection(code));
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSnake(buildSnake({ width, height, length: 3 })));
  }, [dispatch, width, height]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(moveSnake());
    }, 500);

    return () => clearInterval(interval);
  }, [dispatch]);

  const gameField: TGameCell[][] = [];
  for (let i = 0; i < height; i += 1) {
    const row: TGameCell[] = [];
    for (let j = 0; j < width; j += 1) {
      row.push({
        x: j,
        y: i,
        type: 'bg',
      });
    }

    gameField.push(row);
  }

  for (let i = 0; i < snake.length; i += 1) {
    const snakeCell = snake[i];
    gameField[snakeCell.y][snakeCell.x].type =
      i === 0 ? 'snakeHead' : 'snakeTail';
  }

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `grid-rows-[repeat(${height},_1fr)]`,
      }}
      className="grid"
    >
      {gameField.map((fieldRow, i) =>
        fieldRow.map((fr, j) => <GameCell key={`${i}-${j}`} type={fr.type} />),
      )}
    </div>
  );
};
