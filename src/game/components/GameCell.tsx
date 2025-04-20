import { memo } from 'react';

import { FIELD_CELL_SIZE_STYLE } from '../constants/game';
import { TGameCellType } from '../model/game';
import { getCellStyle } from '../util/game';

interface Props {
  type: TGameCellType;
}

const GameCell = ({ type }: Props) => {
  const cellStyle = getCellStyle(type);

  return <div style={FIELD_CELL_SIZE_STYLE} className={`${cellStyle}`}></div>;
};

export default memo(GameCell);
