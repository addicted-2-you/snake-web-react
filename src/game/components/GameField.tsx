import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectApples,
  selectGameHeight,
  selectGameWidth,
  selectLastDirection,
  selectSnake,
} from '../store/seletors';
import { TGameCell } from '../model/game';
import { GameCell } from './GameCell';
import {
  addApple,
  addSnakeTail,
  moveSnake,
  setDirection,
  setSnake,
} from '../store/reducer';
import {
  areSameCells,
  buildSnake,
  clampCell,
  getNewTail,
  getRandomCell,
} from '../util/game';
import { ARROW_KEYS } from '../constants/keys';
import { TArrowKey } from '../model/keys';

export const GameField = () => {
  const dispatch = useDispatch();

  const width = useSelector(selectGameWidth);
  const height = useSelector(selectGameHeight);
  const lastDirection = useSelector(selectLastDirection);
  const snake = useSelector(selectSnake);
  const apples = useSelector(selectApples);

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
    const snake = buildSnake({ width, height, length: 3 });
    let apple = getRandomCell(width, height);
    while (snake.find((s) => s.x === apple.x && s.y === apple.y)) {
      apple = getRandomCell(width, height);
    }

    dispatch(setSnake(snake));
    dispatch(addApple(apple));
  }, [dispatch, width, height]);

  useEffect(() => {
    const head = snake[0];
    const apple = apples[0];
    if (head && apple) {
      if (areSameCells(head, apple)) {
        const newTail = clampCell(
          getNewTail(snake[snake.length - 1], lastDirection),
          width,
          height,
        );

        let newApple = getRandomCell(width, height);
        while (
          snake.find((s) => areSameCells(s, newApple)) &&
          !areSameCells(newTail, newApple)
        ) {
          newApple = getRandomCell(width, height);
        }

        dispatch(addApple(newApple));
        dispatch(addSnakeTail(newTail));
      }
    }
  }, [dispatch, height, width, lastDirection, snake, apples]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(moveSnake());
    }, 250);

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

  for (let i = 0; i < apples.length; i += 1) {
    const appleCell = apples[i];
    gameField[appleCell.y][appleCell.x].type = 'apple';
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
