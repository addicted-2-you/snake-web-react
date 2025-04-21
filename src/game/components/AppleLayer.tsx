import { memo } from 'react';
import { useSelector } from 'react-redux';

import { GameLayer } from './GameLayer';
import { selectApples } from '../store/seletors';
import GameCell from './GameCell';

interface Props {
  wCells: number;
  hCells: number;
}

const AppleLayer = ({ wCells, hCells }: Props) => {
  const apples = useSelector(selectApples);

  const applesStyle = apples.map((a) => ({
    gridColumnStart: a.x + 1,
    gridColumnEnd: a.x + 1,
    gridRowStart: a.y + 1,
    gridRowEnd: a.y + 1,
  }));

  return (
    <GameLayer wCells={wCells} hCells={hCells} zIndex={10}>
      {apples.map((a, i) => (
        <div key={`${a.x}-${a.y}-${a.type}`} style={applesStyle[i]}>
          <GameCell type={a.type} />
        </div>
      ))}
    </GameLayer>
  );
};

export default memo(AppleLayer);
