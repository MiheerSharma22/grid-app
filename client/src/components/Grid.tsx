import Cell from "./Cell";
import { type CellType } from "../App";

interface Props {
  size: number;
  cells: Record<string, CellType>;
  userId: string;
  userColor: string;
}

export default function Grid({ size, cells, userId, userColor }: Props) {
  return (
    <div
      className="
        bg-[#181c23]
        p-3
        rounded-2xl
        shadow-2xl
        border
        border-zinc-800
      "
    >
      {Array.from({ length: size }).map((_, y) => (
        <div key={y} className="flex">
          {Array.from({ length: size }).map((_, x) => {
            const key = `${x}-${y}`;

            return (
              <Cell
                key={key}
                x={x}
                y={y}
                data={cells[key]}
                userId={userId}
                userColor={userColor}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
