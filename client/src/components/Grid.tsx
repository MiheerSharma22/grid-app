import React from "react";
import Cell from "./Cell";

type GridProps = {
  size: number;
  cells: Record<string, any>;
  userId: string;
  userColor: string;
};

export default function Grid({ size, cells, userId, userColor }: GridProps) {
  const grid = [];

  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const key = `${x}-${y}`;
      row.push(
        <Cell
          key={key}
          x={x}
          y={y}
          data={cells[key]}
          userId={userId}
          userColor={userColor}
        />,
      );
    }
    grid.push(
      <div key={y} className="flex">
        {row}
      </div>,
    );
  }

  return <div>{grid}</div>;
}
