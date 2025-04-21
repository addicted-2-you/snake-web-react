import { PropsWithChildren, useMemo } from 'react';

interface Props {
  wCells: number;
  hCells: number;
  zIndex: number;
}

export const GameLayer = ({
  wCells,
  hCells,
  zIndex,
  children,
}: PropsWithChildren<Props>) => {
  const fieldStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${wCells}, 1fr)`,
      gridTemplateRows: `repeat(${hCells}, 1fr)`,
      zIndex,
    }),
    [wCells, hCells, zIndex],
  );

  return (
    <div style={fieldStyle} className="absolute grid">
      {children}
    </div>
  );
};
