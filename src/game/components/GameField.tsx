import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectApples,
  selectGameHeight,
  selectGameWidth,
  selectLastDirection,
  selectSnake,
} from '../store/seletors';
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
import FieldLayer from './FieldLayer';
import AppleLayer from './AppleLayer';
import SnakeLayer from './SnakeLayer';

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

    if (snake.slice(1).find((s) => areSameCells(s, head))) {
      const snake = buildSnake({ width, height, length: 3 });
      dispatch(setSnake(snake));
      return;
    }

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
    }, 100);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <FieldLayer wCells={width} hCells={height} />
      <AppleLayer wCells={width} hCells={height} />
      <SnakeLayer wCells={width} hCells={height} />
    </>
  );
};
