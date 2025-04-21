import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectSnakeWithStyles } from '../store/seletors';
import GameCell from './GameCell';
import { GameLayer } from './GameLayer';

interface Props {
  wCells: number;
  hCells: number;
}

const SnakeLayer = ({ wCells, hCells }: Props) => {
  const snake = useSelector(selectSnakeWithStyles);

  return (
    <GameLayer wCells={wCells} hCells={hCells} zIndex={20}>
      {snake.map((s) => (
        <div key={`${s.x}-${s.y}-${s.type}`} style={s.style}>
          <GameCell type={s.type} />
        </div>
      ))}
    </GameLayer>
  );
};

export default memo(SnakeLayer);
