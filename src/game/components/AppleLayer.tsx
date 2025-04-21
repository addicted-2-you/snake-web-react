import { memo } from 'react';
import { useSelector } from 'react-redux';

import { GameLayer } from './GameLayer';
import { selectApplesWithStyles } from '../store/seletors';
import GameCell from './GameCell';

interface Props {
  wCells: number;
  hCells: number;
}

const AppleLayer = ({ wCells, hCells }: Props) => {
  const apples = useSelector(selectApplesWithStyles);

  return (
    <GameLayer wCells={wCells} hCells={hCells} zIndex={10}>
      {apples.map((a) => (
        <div key={a.id} style={a.style}>
          <GameCell type={a.type} />
        </div>
      ))}
    </GameLayer>
  );
};

export default memo(AppleLayer);
