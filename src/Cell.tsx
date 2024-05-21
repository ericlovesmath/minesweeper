enum CellState {
  Hidden = "hidden",
  Revealed = "revealed",
  Flagged = "flagged",
}

interface CellProps {
  onClick: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  pos: { x: number; y: number };
  isMine: boolean;
  count: number;
  state: CellState;
}

function Cell({ onClick, onContextMenu, isMine, count, state }: CellProps) {

  return (
    <div className={"cell " + state} onClick={onClick} onContextMenu={onContextMenu}>
      {state == CellState.Flagged
        ? "🚩"
        : state == CellState.Hidden || count == 0
          ? ""
          : isMine
            ? "💣"
            : count}
    </div>
  );
}

export { Cell, CellState };
