import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectSnake } from '../store/seletors';
import GameCell from './GameCell';
import { GameLayer } from './GameLayer';

interface Props {
  wCells: number;
  hCells: number;
}

const SnakeLayer = ({ wCells, hCells }: Props) => {
  const snake = useSelector(selectSnake);

  const snakeStyle = snake.map((s) => ({
    gridColumnStart: s.x + 1,
    gridColumnEnd: s.x + 1,
    gridRowStart: s.y + 1,
    gridRowEnd: s.y + 1,
  }));

  return (
    <GameLayer wCells={wCells} hCells={hCells} zIndex={20}>
      {snake.map((s, i) => (
        <div key={`${s.x}-${s.y}-${s.type}`} style={snakeStyle[i]}>
          <GameCell type={s.type} />
        </div>
      ))}
    </GameLayer>
  );
};

export default memo(SnakeLayer);
