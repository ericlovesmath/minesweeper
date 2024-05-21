import "./game.css";
import { Cell, CellState } from "./Cell";
import { useState } from "react";

interface GameProps {
  nrows: number;
  ncols: number;
  nmines: number;
}

function Game({ nrows, ncols, nmines }: GameProps) {
  const [board, setBoard] = useState(initBoard());

  function neighbors(x: number, y: number) {
    const cells = [];
    for (const dx of [-1, 0, 1]) {
      for (const dy of [-1, 0, 1]) {
        const [xx, yy] = [x + dx, y + dy];
        if (0 <= xx && xx < nrows && 0 <= yy && yy < ncols) {
          cells.push({ x: xx, y: yy });
        }
      }
    }
    return cells;
  }

  function initBoard() {
    const board = [...Array(nrows).keys()].map((_) =>
      [...Array(ncols).keys()].map((_) => ({
        isMine: false,
        count: 0,
        state: CellState.Hidden,
      })),
    );

    let mines_left = nmines;

    while (mines_left > 0) {
      const x = Math.floor(Math.random() * nrows);
      const y = Math.floor(Math.random() * ncols);
      if (!board[x][y].isMine) {
        mines_left -= 1;
        board[x][y].isMine = true;
        for (const cell of neighbors(x, y)) {
          board[cell.x][cell.y].count += 1;
        }
      }
    }

    return board;
  }

  function revealCell(x: number, y: number) {
    if (board[x][y].state != CellState.Hidden) {
      return;
    }
    board[x][y].state = CellState.Revealed;
    if (board[x][y].isMine) {
      console.log("BOOM");
    }
    if (board[x][y].count == 0) {
      for (const cell of neighbors(x, y)) {
        revealCell(cell.x, cell.y);
      }
    }
    setBoard([...board]);
  }

  function flagCell(x: number, y: number) {
    if (board[x][y].state == CellState.Hidden) {
      board[x][y].state = CellState.Flagged;
    } else if (board[x][y].state == CellState.Flagged) {
      board[x][y].state = CellState.Hidden;
    }
    console.log(board[x][y].state);
    setBoard([...board]);
  }

  return board.map((row, x) => (
    <div className="row" key={x}>
      {row.map((cell, y) => (
        <Cell
          key={y}
          onClick={(e) => {
            e.preventDefault();
            revealCell(x, y);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            flagCell(x, y);
          }}
          pos={{ x, y }}
          isMine={cell.isMine}
          count={cell.count}
          state={cell.state}
        />
      ))}
    </div>
  ));
}

export default Game;