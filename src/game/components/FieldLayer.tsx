import { memo, useMemo } from 'react';

import { TGameCell } from '../model/game';
import GameCell from './GameCell';
import { GameLayer } from './GameLayer';

interface Props {
  wCells: number;
  hCells: number;
}

const FieldLayer = ({ wCells, hCells }: Props) => {
  const gameField = useMemo(() => {
    const gf: TGameCell[] = [];
    for (let i = 0; i < hCells; i += 1) {
      for (let j = 0; j < wCells; j += 1) {
        gf.push({
          x: j,
          y: i,
          type: 'bg',
        });
      }
    }

    return gf;
  }, [wCells, hCells]);

  return (
    <GameLayer wCells={wCells} hCells={hCells} zIndex={0}>
      {gameField.map((fr) => (
        <GameCell key={`${fr.x}-${fr.y}-${fr.type}`} type={fr.type} />
      ))}
    </GameLayer>
  );
};

export default memo(FieldLayer);
